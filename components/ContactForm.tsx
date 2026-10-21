"use client";

import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, Send } from "lucide-react";

const topics = ["Collaboration", "Speaking", "Training", "Project enquiry", "Website feedback", "Other"];

function requestedTopic(value: string | null) {
  return value && topics.includes(value) ? value : "Collaboration";
}

export default function ContactForm() {
  const searchParams = useSearchParams();
  const requestedTopicParam = searchParams.get("topic");
  const requestedInterest = (searchParams.get("course") || searchParams.get("project"))?.slice(0, 120) || "";
  const requestedFormat = searchParams.get("format")?.slice(0, 80) || "";
  const requestedGroup = searchParams.get("group")?.slice(0, 80) || "";
  const requestedType = searchParams.get("request")?.slice(0, 80) || "";
  const [topic, setTopic] = useState(() => requestedTopic(requestedTopicParam));
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [emailFallbackHref, setEmailFallbackHref] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setTopic(requestedTopic(requestedTopicParam));
    const details = [
      requestedInterest && `I’d like to request information about: ${requestedInterest}.`,
      requestedFormat && `Preferred format: ${requestedFormat}.`,
      requestedGroup && `Estimated group size: ${requestedGroup}.`,
      requestedType && `Request type: ${requestedType}.`,
    ].filter(Boolean);
    setMessage(details.join("\n"));
  }, [requestedFormat, requestedGroup, requestedInterest, requestedTopicParam, requestedType]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    if (form.get("company")) return;

    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const selectedTopic = String(form.get("topic") || "Other");
    const submittedMessage = String(form.get("message") || "").trim();

    if (!name || !email || !submittedMessage) {
      setStatus("Please add your name, email address, and a short message.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("Please enter a valid email address so the reply route is clear.");
      return;
    }

    setSending(true);
    setStatus("");
    setEmailFallbackHref("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topic: selectedTopic, message: submittedMessage, company: form.get("company") }),
      });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (response.status === 503) {
        const subject = `${selectedTopic} enquiry from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\nTopic: ${selectedTopic}\n\n${submittedMessage}`;
        setEmailFallbackHref(`mailto:jg8347331@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        setStatus("Direct form delivery is being configured. You can send this prepared message through your email app now.");
        return;
      }
      if (!response.ok || !result.ok) throw new Error(result.error || "Unable to send your message.");
      formElement.reset();
      setTopic("Collaboration");
      setMessage("");
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
      <label>What is this about?<select name="topic" value={topic} onChange={(event) => setTopic(event.target.value)}>{topics.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label>Message<textarea name="message" rows={6} value={message} onChange={(event) => setMessage(event.target.value)} required placeholder="A little context helps route your message well." /></label>
      <label className="punk-honeypot" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
      <button className="punk-button is-yellow" type="submit" disabled={sending}><Send size={15} /> {sending ? "Sending…" : "Send enquiry"}</button>
      <p className="punk-form-note">Messages are sent through the official contact delivery service once it is configured. Your form data is not stored in the browser.</p>
      {status && <p className="punk-form-status" role="status">{status}</p>}
      {emailFallbackHref && <a className="punk-form-fallback" href={emailFallbackHref}><Mail size={15} /> Open prepared email draft</a>}
    </form>
  );
}
