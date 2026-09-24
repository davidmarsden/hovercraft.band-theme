# Hovercraft.band theme

Source-controlled presentation layer for hovercraft.band, built for Micro.blog.

## Ownership

GitHub is canonical for the site's presentation code: layouts, styles, scripts and reusable music UI.

Micro.blog remains canonical for posts, pages, uploads and audio. Third-party Micro.blog plugin code does not belong in this repository.

The previous site is a content source, not the design baseline.

## Rebuild principles

- Build a band website, not a conventional blog.
- Preserve useful established URLs, especially song and lyric URLs.
- Curate obsolete material into an archive or redirect it.
- Make release pages and players reusable instead of hard-coded per album.
- Avoid copying generated Micro.blog theme files unless we intentionally override them.
- Design mobile-first and progressively enhance playback.

## Proposed information architecture

- **Home** — current identity, featured release and immediate access to music.
- **Music** — release catalogue and album/player pages.
- **Songs** — lyrics and song pages connected to recordings and releases.
- **Story** — current band biography/history.
- **Archive** — historical press, flyers, photographs and superseded material.
- **News** — Micro.blog posts without defining the homepage.

EPK and utility pages can remain available without necessarily appearing in primary navigation.

## Roadmap

1. Install and verify the GitHub-managed Micro.blog plugin/theme shell.
2. Audit and map existing content and URLs.
3. Build the new visual system and global shell.
4. Build reusable release/player components.
5. Launch *Doomed To Live* as the first release in the new system.
6. Migrate other releases and curate/archive legacy material.

See `docs/architecture.md` and `docs/content-migration.md`.
