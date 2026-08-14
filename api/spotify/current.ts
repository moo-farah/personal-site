import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

async function getAccessToken() {
  const CLIENT_ID = process.env.VITE_SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.VITE_SPOTIFY_CLIENT_SECRET;
  const REFRESH_TOKEN = process.env.VITE_SPOTIFY_REFRESH_TOKEN;

  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    throw new Error('Missing Spotify credentials in environment variables');
  }

  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN,
      }),
      {
        headers: {
          Authorization: `Basic ${basic}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw error;
  }
}

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(
      `${SPOTIFY_API_BASE}/me/player/currently-playing`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 204) {
      return res.status(200).json(null);
    }

    const track = response.data.item;
    if (!track) {
      return res.status(200).json(null);
    }

    return res.status(200).json({
      id: track.id,
      name: track.name,
      artist: track.artists.map((artist: any) => artist.name).join(', '),
      album: track.album.name,
      albumImageUrl: track.album.images[0].url,
      spotifyUrl: track.external_urls.spotify,
    });
  } catch (error) {
    console.error('Error fetching current track:', error);
    res.status(500).json({ error: 'Failed to fetch current track' });
  }
};
