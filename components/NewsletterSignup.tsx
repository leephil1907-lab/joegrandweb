"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";

export default function NewsletterSignup() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("subscriberEmail") || "").trim();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("Enter a valid email address to continue.");
      return;
    }

    setSending(true);
    setStatus("");
    try {
      const response = await fetch("/api/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "Updates are temporarily unavailable.");
      form.reset();
      setStatus("You’re on the list — please check your inbox for any confirmation from the updates provider.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Updates are temporarily unavailable. Please try again later.");
    } finally {
      setSending(false);
    }
  }

  return <form className="punk-newsletter-form" onSubmit={subscribe} noValidate><label htmlFor="subscriberEmail">Email for occasional updates</label><div><input id="subscriberEmail" name="subscriberEmail" type="email" autoComplete="email" placeholder="you@example.com" required /><button type="submit" disabled={sending}><Mail size={15} /> {sending ? "Requesting…" : "Request updates"}</button></div><p>Updates are delivered only when the official newsletter provider is configured. No tracking is embedded in this form.</p>{status && <span role="status">{status}</span>}</form>;
}
