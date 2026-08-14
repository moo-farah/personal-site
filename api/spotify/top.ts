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
      `${SPOTIFY_API_BASE}/me/top/tracks?limit=5&time_range=short_term`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.data || !response.data.items) {
      return res.status(200).json([]);
    }

    const tracks = response.data.items.map((item: any) => ({
      id: item.id,
      name: item.name,
      artist: item.artists.map((artist: any) => artist.name).join(', '),
      album: item.album.name,
      albumImageUrl: item.album.images[0].url,
      spotifyUrl: item.external_urls.spotify,
    }));

    return res.status(200).json(tracks);
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    res.status(500).json({ error: 'Failed to fetch top tracks' });
  }
};
