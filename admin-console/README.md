# Joe Grand private operations console

This is a separate Next.js app, intentionally **not** a route of the public Joe Grand website. It provides a protected release/operations surface without exposing an `/admin` address on the visitor-facing deployment.

## Deploy it separately

1. Create a second Vercel project from the same repository.
2. Set **Root Directory** to `admin-console`.
3. Assign an admin-only hostname, for example `admin.yourdomain.com`. Do not use the public-site hostname or add a public navigation link.
4. Add these production environment variables in the **admin** Vercel project only:
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `ADMIN_SESSION_SECRET` — a unique random string of at least 32 characters.
5. Enable Vercel Deployment Protection (or an equivalent identity-aware access proxy) for the admin project. This creates a host-level gate in addition to the application login.
6. Deploy and verify that an unauthenticated request redirects to `/login`, and that a logged-in session can be locked with the header control.

## Security behavior included

- Credentials exist only as server-side deployment environment variables.
- Middleware verifies a signed, `HttpOnly`, `SameSite=Strict` session cookie before a protected page is rendered.
- Session lifetime is eight hours; logout clears the cookie.
- No public navigation references this application.
- Responses carry no-index/no-store, clickjacking, MIME-sniffing, referrer, permission-policy, and CSP protections.

## Important boundary

This app protects administration access; it cannot make a repository, hosting account, or browser absolutely untamperable. Keep Vercel, GitHub, DNS, and identity-provider access restricted with MFA and least privilege. Any future CMS/write API should use server-side credentials, schema validation, audit logs, and role-based permissions—never client-visible provider keys.

## Local check

```bash
cd admin-console
cp .env.example .env.local
# Fill the three local values; do not commit .env.local
npm ci
npm run lint
npm run build
```
