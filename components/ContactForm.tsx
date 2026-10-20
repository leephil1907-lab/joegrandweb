"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

const topics = ["Collaboration", "Speaking", "Training", "Project enquiry", "Website feedback", "Other"];

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    if (form.get("company")) return;

    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const topic = String(form.get("topic") || "Other");
    const message = String(form.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("Please add your name, email address, and a short message.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("Please enter a valid email address so the reply route is clear.");
      return;
    }

    setSending(true);
    setStatus("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topic, message, company: form.get("company") }),
      });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "Unable to send your message.");
      formElement.reset();
      setStatus("Thanks — your message has been sent.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to send your message. Please try again later.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="punk-contact-form" onSubmit={handleSubmit} noValidate>
      <div className="punk-form-row"><label>Name<input name="name" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label></div>
      <label>What is this about?<select name="topic" defaultValue="Collaboration">{topics.map((topic) => <option key={topic}>{topic}</option>)}</select></label>
      <label>Message<textarea name="message" rows={6} required placeholder="A little context helps route your message well." /></label>
      <label className="punk-honeypot" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
      <button className="punk-button is-yellow" type="submit" disabled={sending}><Send size={15} /> {sending ? "Sending…" : "Send enquiry"}</button>
      <p className="punk-form-note">Messages are sent through the official contact delivery service once it is configured. Your form data is not stored in the browser.</p>
      {status && <p className="punk-form-status" role="status">{status}</p>}
    </form>
  );
}
