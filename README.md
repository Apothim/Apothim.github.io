# Legacy of Zodiac website

Static site: plain HTML/CSS/JS, no build step. Open `index.html` or serve the folder.

- **Links:** edit `config.js` (Discord invite, launcher download, releases repo).
- **Patch notes:** loaded automatically from the GitHub releases of `Apothim/LoZClient`, so
  publishing a client release with notes updates the site. `patch-notes.js` is the offline
  fallback; add `pinned: true` entries there for news that isn't a client release.
- **Screenshots:** `assets/shots/*.webp`, rendered offline from the packaged maps (512x384 at 2x).
- **Art:** `assets/art/` came from PixelLab; `assets/sprites/` are the game's own class sprites
  (south stand, south walk, east stand, east walk).

Preview locally: `python3 -m http.server 8791 --directory website`

Hosting: GitHub Pages only serves a repo's root or `/docs`, so put this folder in its own
small repo (or a `gh-pages` branch) and turn on Pages there. Netlify or Cloudflare Pages
also work: drag the folder in.
