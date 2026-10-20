# Joe Grand — Hardware Hacking, Security & Creative Engineering

A responsive Next.js App Router website for Joe Grand (Kingpin), built around a punk hardware-lab visual system, public project discovery, video learning, training, community links, and an interactive Kingpin Badge Generator.

## What is included

- Reference-inspired yellow, black, pink, purple, and lime visual identity
- Responsive homepage with projects, videos, community, training, support, and contact paths
- Dedicated `/about`, `/projects`, `/videos`, `/training`, `/community`, `/contact`, and `/privacy` pages
- Public YouTube profile and banner imagery stored locally in `public/youtube-assets/`
- A shareable Kingpin Badge Generator with live preview, PNG download, local browser storage, and copyable configuration URLs
- Contact and update forms with server-side webhook integration points; no public contact email is exposed
- Keyboard skip link, visible focus handling, page metadata, `sitemap.xml`, `robots.txt`, manifest, and a branded Open Graph image

## Content workflow

Editorial catalog data lives in [`content/site-content.ts`](content/site-content.ts):

- official links and contact address
- videos
- projects
- training courses

Update this single content source to refresh the public project, video, and training pages. See [`content/README.md`](content/README.md) for details and an eventual headless-CMS migration path.

## Local development

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
npm start
```

## Privacy and integrations

Google Analytics is ready for opt-in deployment through Google Consent Mode. Contact and newsletter routes are ready to forward data to server-side provider webhooks. They stay unavailable until their environment variables are configured.

Before connecting a CMS, email service, analytics platform, or newsletter provider:

1. Put credentials and webhook URLs in deployment environment variables—never client-side code.
2. Update `/privacy` with the provider, purpose, and retention details.
3. Confirm approved/owned image and copy rights for all public assets.

## Deployment

The app is compatible with standard Next.js hosting such as Vercel. Set the production domain in `app/layout.tsx` (`metadataBase`) if it differs from `https://joegrand.com`.
