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

Start with the smallest possible override surface. Do not import the old generated theme wholesale.

The first installation should prove that Micro.blog can load this repository cleanly without changing public presentation. Visual overrides are introduced deliberately after installation is verified.

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
