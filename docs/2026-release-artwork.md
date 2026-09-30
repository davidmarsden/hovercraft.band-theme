# 2026 release artwork register

This file records the canonical visual assets used by the Hovercraft 2026 release site and, in particular, the physical turntable player.

## Player artwork rules

- `data/songbook.json` remains the main song metadata source. Where a song has `track_artwork`, the player uses it.
- `data/release-track-artwork.json` records confirmed 2026 track covers that were supplied after the original songbook artwork pass and are not yet present there.
- The turntable changes its spinning disc image when the track changes.
- If a release track has no dedicated track cover, the player falls back to the album cover and retains album-cover alt text rather than falsely describing it as track artwork.
- Lyrics collage artwork is separate from track/sleeve artwork and is not used as a player substitute unless explicitly registered as track artwork.

## Newly confirmed track covers — 30 September 2026

### Crazy

Canonical URL: `https://hovercraft.band/uploads/2026/file-00000000fa60820a8186bc10c66f1a97.png`

Description: split image combining a realistic half-portrait of a face with a rough hand-drawn distorted face.

### Concrete Hill

Canonical URL: `https://hovercraft.band/uploads/2026/file-00000000840481f498880211426bbe11.png`

Description: black-and-white Hovercraft promotional image with a close-up of a man's face against a brick wall.

### Oh Yeah

Canonical URL: `https://hovercraft.band/uploads/2026/05b156f814.png`

Description: musician playing electric guitar and singing into a microphone beneath the Hovercraft and Oh Yeah titles.

## Related branding assets

The central release register (`data/releases.json`) contains the canonical Hovercraft circular and square logos and the Doomed To Live / Oh Yeah banners. Those assets should be referenced from release data rather than duplicated in templates.
