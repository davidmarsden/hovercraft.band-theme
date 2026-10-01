# Release links rollout

The December 2026 releases will eventually need two kinds of outbound links on hovercraft.band:

1. **Hi-res download store** — embed the store only if its embed is lightweight, accessible and visually compatible with the site. Otherwise use a prominent direct purchase link.
2. **Mainstream streaming services** — Spotify, Apple Music, YouTube Music and any other confirmed release destinations.

## Implementation rule

Keep this static and data-driven. Do not add accounts, a database, social/community features or an application layer.

When final release URLs exist, add one reusable Hugo release-links partial/data source and render it from the homepage release hero, `/music/`, and the relevant release pages. The component should render nothing when no links are configured and must continue to respect the existing `hovercraft_release_live` release gate.

Do not add placeholder platform URLs before release.