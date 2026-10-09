# Micro.blog Store page

The theme includes a `/store/` content stub for standalone Hugo builds. If Micro.blog does not publish theme-provided content pages, create a normal Micro.blog page titled **Store** with the URL `/store/`. The theme's `layouts/page/single.html` route will take over presentation; the page body can remain empty.

## CD booklet previews (pre-release and launch)

The Store template renders the release variant inside `data-hc-release` for browser-local preview, while the public teaser stays inside `data-hc-public` until launch. It uses the same preview session as the Music page. Do not put booklet links in the public teaser.

Upload the approved **reader PDFs** (not imposed printer spreads) to Micro.blog's media uploads, then set `booklet_url` on the corresponding album in `data/releases.json` to each returned absolute HTTPS URL. The Store renders an 'Inside the CD' section only for albums with a populated `booklet_url`, including a PDF link and an expanded-digital-booklet note. There is intentionally no website feedback form. Do not guess media URLs or publish a broken link.

Approved local source files as of 9 October 2026:
- Doomed To Live: `Doomed-To-Live-FINAL-TYPOGRAPHY-READER.pdf`
- Oh Yeah: `Oh-Yeah-CLEAN-READER.pdf` (with the approved listening-route spacing if a later proof is available, use that instead).

Check the preview link on `/store/` with the preview token, verify both PDFs open on mobile, then exit preview and verify the public page reveals no album names or booklet links.
