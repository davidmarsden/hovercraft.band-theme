# Store architecture

Checkout and file delivery remain on Payhip. `hovercraft.band/store/` is the presentation layer: artwork, release context and links to the appropriate Payhip product. The site never handles payment details.

`data/platforms.json` owns provider names and the fallback Payhip storefront. `data/releases.json` owns release-specific product and streaming URLs. `hc-release-links.html` consumes both on the Music catalogue, while `hc-store-page.html` presents the dedicated Store view.

Missing streaming URLs intentionally render nothing. Missing `store_url` intentionally falls back to the main Hovercraft Payhip storefront.
