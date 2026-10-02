# Store and streaming links

The Hovercraft store is hosted at https://payhip.com/Hovercraft. The canonical storefront and supported streaming services live in `data/platforms.json`.

## Per-release links

Each album in `data/releases.json` may optionally define:

```json
"store_url": "https://payhip.com/b/PRODUCT",
"streaming": {
  "spotify": "https://open.spotify.com/...",
  "apple-music": "https://music.apple.com/...",
  "youtube-music": "https://music.youtube.com/...",
  "bandcamp": "https://...bandcamp.com/..."
}
```

`store_url` falls back to the main Hovercraft Payhip storefront when absent. Streaming services have no fallback: a button is rendered only when that release has a real URL for that service. This prevents dead or misleading platform links.

The 2025 releases and the 2026 releases must remain separate release records when platform URLs are added. They are different recordings even where the compositions overlap.
