const checks = [
  { label: "Session protection", value: "Active", detail: "Signed HttpOnly cookie checked in middleware before every protected route." },
  { label: "Public discoverability", value: "Blocked", detail: "No navigation link, robots metadata, and no-index response header are included." },
  { label: "Cache policy", value: "Disabled", detail: "Private responses are configured with no-store so operations data is not left in shared caches." },
];

export default function AdminHome() {
  const configured = Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && (process.env.ADMIN_SESSION_SECRET?.length || 0) >= 32);

  return (
    <main className="console-shell">
      <header className="console-header">
        <div><span className="console-mark">JG</span><p>JOE GRAND <b>OPERATIONS</b></p></div>
        <form action="/api/logout" method="post"><button type="submit">Lock console <span aria-hidden="true">↗</span></button></form>
      </header>

      <section className="console-hero" aria-labelledby="console-title">
        <p className="eyebrow">PRIVATE RELEASE SURFACE / SEPARATE DEPLOYMENT</p>
        <h1 id="console-title">Control room,<br /><em>not content.</em></h1>
        <p>This intentionally does not mirror the public website or expose public editing controls. Use it as a protected release and configuration checkpoint, deployed separately from the visitor-facing site.</p>
        <span className={`console-status ${configured ? "is-ready" : "is-alert"}`}>{configured ? "Credential configuration present" : "Credential configuration incomplete"}</span>
      </section>

      <section className="console-grid" aria-label="Security status">
        {checks.map((check, index) => <article key={check.label} className="console-card"><span>0{index + 1}</span><h2>{check.label}</h2><strong>{check.value}</strong><p>{check.detail}</p></article>)}
      </section>

      <section className="console-runbook" aria-labelledby="runbook-title">
        <div><p className="eyebrow">RUNBOOK / BEFORE A RELEASE</p><h2 id="runbook-title">Keep the controls <em>separate.</em></h2></div>
        <ol>
          <li><span>01</span><div><strong>Use a second Vercel project.</strong><p>Set this folder as that project&apos;s Root Directory and assign an admin-only subdomain, not a route on the public hostname.</p></div></li>
          <li><span>02</span><div><strong>Set unique deployment secrets.</strong><p>Configure the administrator ID, password, and a 32-character-or-longer session secret only in the admin project.</p></div></li>
          <li><span>03</span><div><strong>Add a host-level access gate.</strong><p>Enable Vercel Deployment Protection or equivalent identity access in addition to this application login.</p></div></li>
          <li><span>04</span><div><strong>Keep write actions server-side.</strong><p>When a CMS or release API is connected later, use server-only credentials, validation, audit logging, and least-privilege roles.</p></div></li>
        </ol>
      </section>

      <footer className="console-footer"><p>Private operations surface · No public navigation · No public indexing</p><p>For deployment detail, see <code>admin-console/README.md</code> in the repository.</p></footer>
    </main>
  );
}
