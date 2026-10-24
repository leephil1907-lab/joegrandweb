type LoginPageProps = { searchParams: { error?: string; next?: string } };

export default function LoginPage({ searchParams }: LoginPageProps) {
  const configured = Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD && (process.env.ADMIN_SESSION_SECRET?.length || 0) >= 32);
  const hasError = searchParams.error === "invalid";

  return (
    <main className="login-shell">
      <section className="login-card" aria-labelledby="login-title">
        <p className="eyebrow">PRIVATE SURFACE / ADMIN CONSOLE</p>
        <h1 id="login-title">Operations,<br /><em>not public.</em></h1>
        <p className="login-copy">This is a separate deployment surface. It is not linked from the public site and only opens with server-side environment credentials.</p>
        {!configured ? <p className="login-alert" role="alert"><strong>Configuration required.</strong> Add all three administrator environment values before this console can be used.</p> : null}
        {hasError ? <p className="login-alert" role="alert">The supplied credentials were not accepted. Try again.</p> : null}
        <form action="/api/login" method="post" className="login-form">
          <input type="hidden" name="next" value={searchParams.next === "/" ? "/" : "/"} />
          <label>Administrator ID<input name="username" type="text" autoComplete="username" required disabled={!configured} /></label>
          <label>Passphrase<input name="password" type="password" autoComplete="current-password" required disabled={!configured} /></label>
          <button type="submit" disabled={!configured}>Unlock console <span aria-hidden="true">→</span></button>
        </form>
        <p className="login-meta">8-hour HttpOnly session · strict same-site cookie · no indexing · separate host recommended</p>
      </section>
    </main>
  );
}
