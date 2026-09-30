# 2026 release artwork register

This file records the canonical visual assets used by the Hovercraft 2026 release site and, in particular, the physical turntable player.

## Player artwork rules

- `data/songbook.json` remains the main song metadata source. Where a song has `track_artwork`, the player uses it.
- `data/release-track-artwork.json` records confirmed release-specific track covers and archival 1996 covers supplied after the original songbook artwork pass.
- Album sleeves, 2026 track artwork and 1996 archival artwork are distinct assets and must not be substituted for one another.
- The turntable changes its spinning disc image when the track changes.
- If a release track has no dedicated track cover, the player falls back to that release's album cover and retains album-cover alt text rather than falsely describing it as track artwork.
- Archival bonuses use explicit `-1996` artwork registrations, preventing the 1996 New Pine Overcoat, To The Grave and Concrete Hill recordings from inheriting their 2026 song covers.
- Lyrics collage artwork is separate from track/sleeve artwork and is not used as a player substitute unless explicitly registered as track artwork.

## Confirmed 2026 track covers — 30 September 2026

### Crazy

Canonical URL: `https://hovercraft.band/uploads/2026/file-00000000fa60820a8186bc10c66f1a97.png`

### Concrete Hill

Canonical URL: `https://hovercraft.band/uploads/2026/file-00000000840481f498880211426bbe11.png`

### Oh Yeah

Canonical URL: `https://hovercraft.band/uploads/2026/05b156f814.png`

This is the **Oh Yeah track cover**, not the companion album sleeve.

### Season Of The Witch

Canonical URL: `https://hovercraft.band/uploads/2026/file-0000000006c081f48a16f620989821d2.png`

### Take It Or Leave It

Canonical URL: `https://hovercraft.band/uploads/2026/file-00000000893c81f4b85b1a625210c28e.png`

## Confirmed 1996 archival covers — 30 September 2026

### Concrete Hill (1996 original)

Canonical URL: `https://hovercraft.band/uploads/2026/file-00000000b7d081f49e096c9027218f372.jpg`

### New Pine Overcoat (1996 original)

Canonical URL: `https://hovercraft.band/uploads/2026/file-0000000058a881f494664c4f57edcabe4.jpg`

### To The Grave (1996 original)

Canonical URL: `https://hovercraft.band/uploads/2026/file-0000000055e881f4a1d4bd7e65feb199.png`

## Physical player sound rules

Needle effects model an album side rather than individual digital files. Needle-down plays only when playback starts at the beginning of a side; tracks within a side advance without an effect; needle-up plays when the side finishes. Previous/next and ordinary pause/resume do not add fake needle events.

## Related branding assets

The central release register (`data/releases.json`) contains the canonical Hovercraft circular and square logos and the release banners. Album sleeves belong there; track and archival artwork belongs in the track-artwork register.
