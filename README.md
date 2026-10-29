# Mohamed Farah

Personal site for [Mohamed Farah](https://www.mohamedfarah.dev) — a frontend engineer in Nairobi building with React and TypeScript.

The site is a single-page React app with animated page transitions, a class-based dark theme, live Spotify listening data, YouTube channel content, and Cal.com booking.

**Live:** [mohamedfarah.dev](https://www.mohamedfarah.dev)

## Features

- **Home** — typed intro, Nairobi local time, latest long-form YouTube video plus a previous-video carousel, and Spotify now-playing / recently played / top tracks
- **About** — stacked polaroid photo gallery (hover-to-flip, drag on desktop), timeline, skills, projects, and hobbies
- **Fun** — interactive playgrounds: magnetic dot field, draggable type, marble physics, and a tilt-able orbit
- **Contact** — email, Instagram, LinkedIn, plus embedded Cal.com scheduling (15 min or 60 min)
- Dark / light theme with a spring-animated nav indicator, persisted in `localStorage`
- Framer Motion page transitions, scroll fade-ins, and a delayed footer so the first paint stays clean
- Vercel Analytics

## Stack

| Layer | Choice |
| --- | --- |
| UI | React 18, TypeScript, Vite 5 |
| Routing | React Router 6 |
| Styling | Tailwind CSS 3 (`darkMode: 'class'`), custom theme tokens in `src/styles/theme.ts` |
| Motion | Framer Motion, react-type-animation |
| APIs | Spotify Web API, YouTube Data API v3, Cal.com embed |
| Deploy | Vercel (SPA rewrite in `vercel.json`) |

## Pages

| Route | File | What it renders |
| --- | --- | --- |
| `/` | `src/pages/Home.tsx` | Intro, live Nairobi time (`useLiveTime`), `YouTubeLatest`, `SpotifyPlaying` |
| `/about` | `src/pages/About.tsx` | `PhotoGallery` + `AboutSection` (timeline, skills, projects, hobbies from `src/data/sections.tsx`) |
| `/fun` | `src/pages/Fun.tsx` | Playgrounds in `src/components/fun/` (`/gear` redirects here) |
| `/contact` | `src/pages/Contact.tsx` | Social cards + Cal.com event picker (`moo-farah/coffee-chat`, `moo-farah/partnership-founder-chat`) |

Shared chrome lives in `src/App.tsx`: `Navbar`, animated `Routes`, delayed `Footer`, and `ScrollToTop` on every navigation. `ThemeProvider` wraps the tree and `Layout` applies the background color.

## Project structure

```
src/
├── App.tsx                 # Routes, page transitions, delayed footer
├── main.tsx                # BrowserRouter + Vercel Analytics
├── pages/                  # Home, About, Fun, Contact
├── components/             # Layout, media, about, and shared UI
├── context/ThemeContext.tsx
├── data/                   # photos, about sections
├── hooks/                  # Spotify, YouTube, time, title, in-view
├── styles/theme.ts         # Light / dark color tokens
├── types/                  # Spotify and gallery types
└── utils/                  # Fade-in, portal, animations, scroll restore
```

Content you are likely to edit:

- Bio, timeline, and projects → `src/data/sections.tsx`
- Skills pills → `src/components/SkillsSection.tsx`
- Hobbies → `src/components/HobbiesSection.tsx`
- Polaroid photos → `src/data/photos.ts` and `src/assets/images/`
- Fun playgrounds → `src/components/fun/`

## Getting started

Requires Node.js and npm.

```bash
git clone https://github.com/moo-farah/personal-site.git
cd personal-site
npm install
```

Create a `.env` file in the project root (see below), then:

```bash
npm run dev
```

Vite serves the app at `http://localhost:5173`. Other scripts:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check with `tsc`, then production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | ESLint on `ts` / `tsx` |

## Environment variables

Copy these into `.env`. Vite only exposes variables prefixed with `VITE_`. `.env` is gitignored.

```bash
# Spotify (currently playing, recently played, short-term top tracks)
VITE_SPOTIFY_CLIENT_ID=
VITE_SPOTIFY_CLIENT_SECRET=
VITE_SPOTIFY_REFRESH_TOKEN=

# YouTube Data API v3 (latest uploads, channel stats, hobby video count)
VITE_YOUTUBE_API_KEY=
VITE_YOUTUBE_CHANNEL_ID=
```

### Spotify

`useSpotifyAuth` exchanges the refresh token for an access token, then `useSpotify` calls:

- `GET /v1/me/player/currently-playing`
- `GET /v1/me/player/recently-played?limit=5`
- `GET /v1/me/top/tracks?limit=5&time_range=short_term`

Create an app in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard). The refresh token needs scopes `user-read-currently-playing`, `user-read-recently-played`, and `user-top-read`. Without these variables the Spotify block on Home stays empty.

### YouTube

Enable **YouTube Data API v3** in Google Cloud and set the channel ID. `YouTubeLatest` loads the uploads playlist, keeps videos longer than 2 minutes, embeds the newest one, and shows older ones in `VideoCarousel`. Channel subscriber and view counts sit next to the heading. `useYouTubeVideoCount` feeds the YouTube hobby stat on About.

Without these variables, Home shows the video skeleton and the hobby count falls back to an em dash.

### Cal.com

No env vars. Event types are public Cal links in `src/pages/Contact.tsx`.

## Theme

Dark mode is the default. `ThemeContext` toggles the `dark` class on `<html>` and stores `theme` in `localStorage`. Color tokens (backgrounds, nav bubble, text) live in `src/styles/theme.ts`. The sun/moon control is in the navbar and is hidden below the `sm` breakpoint.

## Deployment

The app is a client-side SPA. `vercel.json` rewrites all paths to `index.html` so routes like `/about` work on refresh.

Set the same `VITE_*` variables in the Vercel project settings. They are inlined at build time.

```bash
npm run build
```

Output lands in `dist/`.
