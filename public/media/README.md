# DealSync landing — product media

Drop real screenshots / screen recordings here, then point to them in the
`MEDIA` manifest at the top of `src/App.jsx`. Until a path is set there, the
page falls back to its hand-built mockup, so the site always looks complete.

## ⚠️ Compliance first
Capture **only with sample / fake borrower data**. Use the in-app "Load sample
data" feature — never record a real client's name, contact info, SSN, or
financials. The whole point is authority *without* exposing PII.

## Format
- **Video**: short (≤15s), **muted, autoplay-loop**, `.mp4` (H.264) or `.webm`.
  Record at a fixed window size (~1280×800). Keep files small (< ~4 MB) so the
  page stays fast — trim to the essential motion, no cursor wandering.
- **Images**: `.webp` preferred (or `.png`), ~1280px wide, retina if easy.

## Shot list (priority order)
| Manifest key   | Filename suggestion   | What to capture |
|----------------|-----------------------|-----------------|
| `hero`         | `hero-coach.mp4`      | Open a sample deal card → click **Coach me** → the drafted next-move message appears. The single best 10–15s clip — tells the whole story above the fold. |
| `heroPoster`   | `hero-coach.webp`     | A clean still frame of the Coach result, shown before the video plays. |
| `letter`       | `letter.webp`         | A generated pre-approval (or VOF) letter PDF on your letterhead — real logo, signature, compliance language. Highest-authority proof the output is real. |

## Wiring it up
In `src/App.jsx`, set the paths (leading slash = `/public`):

```js
const MEDIA = {
  hero: "/media/hero-coach.mp4",
  heroPoster: "/media/hero-coach.webp",
  letter: "/media/letter.webp",
};
```

Then `npm run build` and deploy. Anything left `null` keeps the mockup fallback.

## Nice-to-have later (not yet wired, easy to add)
- Borrower portal on a phone frame (still or short scroll)
- The 7am follow-up digest email (still)
- A short clip of a Realtor requesting a letter → it landing on the LO side
