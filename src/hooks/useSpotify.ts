import { useState, useEffect } from 'react';
import axios from 'axios';

interface Track {
  id: string;
  name: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  spotifyUrl: string;
}

declare global {
  interface Window {
    Spotify: any;
    onSpotifyWebPlaybackSDKReady: () => void;
  }
}

export function useSpotify() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  // Fetch current track
  useEffect(() => {
    const fetchCurrentTrack = async () => {
      try {
        const response = await axios.get('/api/spotify/current');
        setCurrentTrack(response.data);
      } catch (error) {
        console.error('Error fetching current track:', error);
        setCurrentTrack(null);
      }
    };

    fetchCurrentTrack();
  }, []);

  // Fetch recent tracks
  useEffect(() => {
    const fetchRecentTracks = async () => {
      try {
        const response = await axios.get('/api/spotify/recent');
        setRecentTracks(response.data);
      } catch (error) {
        console.error('Error fetching recent tracks:', error);
      }
    };

    fetchRecentTracks();
  }, []);

  // Fetch top tracks
  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await axios.get('/api/spotify/top');
        setTopTracks(response.data);
      } catch (error) {
        console.error('Error fetching top tracks:', error);
      }
    };

    fetchTopTracks();
  }, []);

  return {
    currentTrack,
    recentTracks,
    topTracks,
  };
} 