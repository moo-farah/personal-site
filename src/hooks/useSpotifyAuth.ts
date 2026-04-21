import { useState, useEffect } from 'react';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const useSpotifyAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
      setAuthError('Missing Spotify environment variables.');
      return;
    }

    let timeoutId: number | undefined;
    let cancelled = false;

    const refreshAccessToken = async () => {
      try {
        const data = await getAccessToken();

        if (cancelled) return;

        if (data?.error || !data?.access_token) {
          const errorMessage = data?.error_description || data?.error || 'Unable to fetch Spotify access token.';
          setAuthError(errorMessage);
          return;
        }

        setToken(data.access_token);
        setAuthError(null);

        const expiresInSeconds = Number(data.expires_in || 3600);
        const refreshInMs = Math.max((expiresInSeconds - 60) * 1000, 60_000);
        timeoutId = window.setTimeout(refreshAccessToken, refreshInMs);
      } catch (error) {
        if (!cancelled) {
          console.error('Error fetching Spotify access token:', error);
          setAuthError('Failed to refresh Spotify token.');
        }
      }
    };

    refreshAccessToken();

    return () => {
      cancelled = true;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  const getAccessToken = async () => {
    const basic = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
    const params = new URLSearchParams();
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", REFRESH_TOKEN);

    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString()
    })
    return response.json();
}
  
  return { token, authError };
};