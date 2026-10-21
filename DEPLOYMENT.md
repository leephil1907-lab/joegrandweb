# Deployment plan — Vercel

Vercel is the recommended host for this project because it natively supports Next.js App Router, server route handlers, streaming AI chat responses, environment variables, preview deployments, and GitHub-based continuous deployment.

## 1. Push the repository to GitHub

Push this project to the intended GitHub repository. The included GitHub Actions workflow will run TypeScript and production-build checks on pushes and pull requests.

## 2. Import into Vercel

1. Sign in at [vercel.com](https://vercel.com) with the GitHub account that owns the repository.
2. Select **Add New → Project** and import the repository.
3. Vercel will detect **Next.js** automatically. Use the default settings; `vercel.json` explicitly runs `npm ci` and `npm run build`.
4. Deploy once without optional integrations to confirm the static site.

## 3. Configure environment variables

In **Project Settings → Environment Variables**, add only the integrations being enabled:

| Variable | Purpose | Required for |
|---|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 property identifier, e.g. `G-XXXXXXXXXX` | Opt-in Google Analytics |
| `OPENAI_API_KEY` | Optional server-only OpenAI key | Enhanced AI support chat; otherwise the built-in public site guide remains available |
| `OPENAI_CHAT_MODEL` | Optional chat model override | Enhanced AI support chat |
| `CONTACT_WEBHOOK_URL` | Server-side contact delivery webhook | Contact form |
| `CONTACT_WEBHOOK_TOKEN` | Optional bearer token for the contact webhook | Contact form |
| `NEWSLETTER_WEBHOOK_URL` | Server-side subscription delivery webhook | Newsletter form |
| `NEWSLETTER_WEBHOOK_TOKEN` | Optional bearer token for the newsletter webhook | Newsletter form |

Use `.env.example` as a key list. Never commit `.env.local`, provider API keys, webhook URLs, or bearer tokens.

## 4. Google Analytics 4

1. Create/select a GA4 property for the final domain.
2. Create a Web data stream and copy its Measurement ID (`G-...`).
3. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel, then redeploy.
4. The site shows an opt-in consent prompt before analytics storage is granted. Advertising, ad-user-data, and personalization storage remain denied.
5. Confirm page views using GA4 Realtime after accepting analytics in a clean browser session.

## 5. Configure real contact and newsletter delivery

The public forms post only to internal API routes. Their server routes forward JSON to the configured provider webhook, which means destination emails and provider secrets never appear in browser code.

Recommended implementation choices:

- **Contact:** Resend, Formspree, Zapier, Make, or a custom CRM/webhook endpoint.
- **Newsletter:** Buttondown, ConvertKit, Mailchimp, Beehiiv, or a custom subscriber endpoint.

Configure the provider to accept the payload shape documented by the API routes, test a submission, then update `/privacy` with provider and retention details.

## 6. Connect the custom domain

1. In Vercel, add the production domain under **Settings → Domains**.
2. Create the DNS records Vercel requests at the domain registrar.
3. Once DNS and SSL are active, confirm `https://<domain>/sitemap.xml`, `/robots.txt`, and `/manifest.webmanifest` load.
4. When a custom production domain is connected, update `metadataBase` in `app/layout.tsx`, the Open Graph URL, `app/robots.ts`, and the base URL in `app/sitemap.ts` from the default `https://joegrandweb.vercel.app` value.

## Launch checklist

- [ ] Confirm all public links and imagery are approved.
- [ ] Add GA4 Measurement ID and test consent/realtime analytics.
- [ ] Configure contact and newsletter webhooks; test delivery and errors.
- [ ] Update privacy language with final providers.
- [ ] Connect domain and verify HTTPS.
- [ ] Check generated metadata/social card on the production URL.
- [ ] Review the Vercel deployment log and GitHub Actions check.
