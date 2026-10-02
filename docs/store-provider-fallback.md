# Storefront fallback

When an album has no `store_url`, its Buy hi-res action resolves to `data/platforms.json` → `store.url`. At present that is the Hovercraft Payhip storefront. Once a direct Payhip product URL exists, adding `store_url` to that album automatically upgrades both Store and Music without template edits.
