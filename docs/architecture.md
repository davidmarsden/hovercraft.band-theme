# Architecture

## Source of truth

The site deliberately separates presentation from publishing.

| Concern | Canonical home |
| --- | --- |
| Layouts, CSS, JavaScript, release/player UI | GitHub |
| Posts and pages | Micro.blog |
| Audio and uploaded media | Micro.blog |
| Third-party plugins | Micro.blog plugin system |
| Historical source material | Existing site/export until audited |

## Theme strategy

Micro.blog plug-in assets are loaded through `plugin.json` `includes`; CSS and JavaScript paths refer to files under `static/`. This avoids replacing head hooks merely to load assets.

### Shell v0.2

The first visible shell is deliberately CSS-first. It restyles the semantic structure supplied by the active Micro.blog theme rather than replacing core rendering templates. This keeps posts, feeds, pages and Micro.blog features intact while we establish the visual language. JavaScript is progressive enhancement only; the site remains navigable and readable without it.



Start with the smallest possible override surface. Do not import the old generated theme wholesale.

The first installation should prove that Micro.blog can load this repository cleanly without changing public presentation. Do not ship empty same-named Micro.blog hook partials as placeholders: they can shadow hooks supplied by the active theme or other plugins. Visual overrides are introduced deliberately after installation is verified.

## Content model

The new site should distinguish:

- releases;
- songs;
- news/posts;
- current band story;
- historical/archive material.

A song may belong to more than one recording/release over time. Release/player components therefore should not make lyrics or song identity dependent on a single album.

## Music player

The player will be reusable across releases. Release data should supply track number, title, audio URL, optional song/lyrics URL, credits and duration where available.

Playback should use native HTML audio as the dependable base, with JavaScript adding playlist behaviour and richer controls rather than making playback dependent on JavaScript.

## Existing URLs

Existing useful URLs should normally be retained. If content moves, prefer a redirect or compatibility route rather than silently breaking inbound links.

## Deployment discipline

Changes should be developed on branches and reviewed through pull requests. Micro.blog should consume the stable/default branch once the installation workflow is confirmed.


## Homepage v0.3

The homepage is release-led rather than a chronological blog index. It introduces the current release, band story, primary music/song/press routes and a deliberately small latest-transmissions section.

The managed Hovercraft header/footer are supplied as dedicated partials. The legacy theme chrome is suppressed only when the managed chrome is present, preserving fallback behaviour while this override layer coexists with the underlying Micro.blog theme.

The *Doomed To Live* hero deliberately uses a graphic placeholder built in CSS for this structural pass. Canonical album artwork replaces it in the release/player pass rather than baking an uncertain media URL into the layout.


## Release gate

The December 2026 release is built behind an explicit opt-in flag. Production defaults to the spoiler-free state.

- Default: `params.hovercraft_release_live` is absent/false, so the homepage reveals neither album title nor track count.
- Launch: set `params.hovercraft_release_live = true` in site configuration and rebuild.
- The launch state introduces **Doomed To Live** and **Oh Yeah** together; neither is treated as a secondary release.
- Album-specific pages and assets must not be linked, emitted into public navigation, feeds or sitemaps before launch. Finished release content should remain in Git/version-control or non-production previews until the flag is enabled.
- Do not use a date comparison as the gate. An explicit switch avoids an accidental reveal caused by timezone/build timing and lets the band choose the actual launch moment on 5 December 2026.

The public teaser copy is intentionally non-specific: **New Hovercraft / Coming in time for Xmas / Two records. Thirty years in the making.**


## Release gating

The production homepage has two intentional states:

1. **Pre-release:** public copy teases two new records with “Coming in time for Xmas” but does not name the albums, expose track counts, or link unreleased album routes.
2. **Launch:** the finished two-album treatment for *Doomed To Live* and *Oh Yeah* replaces the teaser when the release is ready to go live.

Finished release pages, players, artwork, credits and song metadata may be developed in GitHub before launch. They should not be linked from production navigation, feeds or sitemaps until the launch state is enabled. This is a practical spoiler barrier, not a secrecy/security boundary: minor leakage is acceptable.

The working target is 5 December 2026. Treat the date as a release target until the launch is confirmed; the public pre-release copy deliberately says “Coming in time for Xmas”.
