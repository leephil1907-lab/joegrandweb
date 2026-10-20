# Joe Grand — Personal Website

A responsive Next.js App Router site with a dark hardware-lab visual direction, electric-green accents, mobile navigation, project and expertise sections, video discovery links, collaboration information, and contact CTA.

## Kingpin Badge Generator

The homepage includes an interactive Kingpin Badge Generator. Visitors can enter a handle, choose one of four badge styles and an accent signal, select a hacker level, preview the design on a live canvas, generate a new badge ID, and download the badge as a PNG. Badge artwork is rendered locally in the browser; handles are not uploaded to a server. The Kingpin level is unlocked by completing the Kingpin Protocol.

## YouTube videos

The homepage video section now uses the five YouTube links supplied for this project, with video thumbnails and direct links to each original watch page. The cards use neutral numbered labels rather than guessed video titles; replace those labels with verified titles when YouTube metadata can be confirmed.

## Local development

```bash
npm install
npm run dev
```

Build for production with `npm run build` and run with `npm start`. The `lint` script runs the TypeScript compiler with `tsc --noEmit`.

## Verification status

Automated CI results are still unavailable, and I have not run a production build or browser test, so those remain to be verified before calling the feature production-tested.

## Before launch

- Confirm the official preferred domain and update `metadataBase` in `app/layout.tsx`.
- Replace the placeholder email address in `app/page.tsx` with a verified contact channel.
- Replace concept/draft project and video copy with approved facts.
- Add verified YouTube video IDs and thumbnails before presenting individual videos as specific published content.
- Add approved portrait, project photography, social profiles, privacy policy, and terms.
- Verify permission for all biography, imagery, project descriptions, and media references.

## Deploy

Import `leephil1907-lab/joegrandweb` into Vercel and keep the default Next.js build settings. The site is a frontend starter and does not currently include a CMS or contact form backend.
