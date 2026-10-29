# ProgressTrack PWA

## Files

| File | Role |
|------|------|
| `index.html` | App UI |
| `manifest.webmanifest` | Install name, icons, display mode |
| `sw.js` | Offline cache (app shell + CDN assets) |
| `icons/` | 192 / 512 / Apple touch / favicon |

## Install on a phone

1. Host this folder over **HTTPS** (required for install + service worker).
2. Open the site in Chrome (Android) or Safari (iOS).
3. **Android Chrome:** menu → **Install app** / **Add to Home screen**
4. **iOS Safari:** Share → **Add to Home Screen**

## Local test

```bash
cd student-tracker
npx --yes serve -p 4173
# open http://localhost:4173
```

Chrome → Application → Manifest / Service Workers to verify.

## Offline behaviour

- App shell (`index.html`, icons, manifest) is cached.
- Bootstrap / icons / fonts from the CDN are cached after first load.
- Student data stays in **localStorage** on the device (not in the service worker).

## Deploy ideas

- Netlify / Vercel / Cloudflare Pages / GitHub Pages / Firebase Hosting  
- Upload the whole `student-tracker` folder (keep relative paths).
