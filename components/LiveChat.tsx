"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Bot, Send, Trash2, X, Sparkles, User, MessageCircle, ExternalLink } from "lucide-react";

type Message = { id: number; sender: "bot" | "user"; text: string };
const STORAGE_KEY = "joegrand-chat-messages";
const baseSuggestions = ["Tell me about Joe Grand", "What projects does Joe work on?", "How can I collaborate?", "Does Joe offer training?"];
const welcome: Message = {
  id: 1,
  sender: "bot",
  text: "Hi! I’m **Joe Grand’s AI assistant**. Ask me about hardware hacking, electronics, security research, videos, training, or collaborations.",
};

function suggestionsFor(text: string) {
  const value = text.toLowerCase();
  if (/(collab|speak|book|partnership|interview)/.test(value)) return ["How do I start a collaboration?", "Can I invite Joe to speak?", "How do I request an interview?"];
  if (/(train|workshop|course|learn)/.test(value)) return ["What topics can training cover?", "How do I request a workshop?", "Where should a beginner start?"];
  if (/(project|hardware|security|electronics)/.test(value)) return ["Tell me about hardware hacking", "What is hardware security research?", "Where can I see project videos?"];
  if (/(video|youtube|watch)/.test(value)) return ["What videos should I watch first?", "What does Joe cover on YouTube?", "Show me engineering topics"];
  return baseSuggestions;
}

export default function LiveChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [suggestions, setSuggestions] = useState<string[]>(baseSuggestions);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Message[];
        if (Array.isArray(parsed) && parsed.length && parsed.every((item) => typeof item.text === "string" && (item.sender === "bot" || item.sender === "user"))) setMessages(parsed);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40))); } catch { /* Storage may be unavailable. */ }
  }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "end" });
  }, [messages, loading, open, reduceMotion]);

  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener("joegrand:open-chat", openChat);
    return () => window.removeEventListener("joegrand:open-chat", openChat);
  }, []);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function sendMessage(raw: string) {
    const text = raw.trim();
    if (!text || loading) return;
    const userMessage: Message = { id: Date.now(), sender: "user", text };
    const replyId = Date.now() + 1;
    const history = [...messages, userMessage].slice(-20);
    setMessages([...history, { id: replyId, sender: "bot", text: "" }]);
    setInput("");
    setLoading(true);
    setSuggestions(suggestionsFor(text));
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.map(({ sender, text: body }) => ({ sender, text: body })) }),
        signal: controller.signal,
      });
      if (!response.ok || !response.body) {
        const reason = await response.text();
        throw new Error(reason || "The assistant is temporarily unavailable.");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setMessages((current) => current.map((message) => message.id === replyId ? { ...message, text: answer } : message));
      }
      answer += decoder.decode();
      if (!answer.trim()) throw new Error("The assistant returned an empty response.");
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        const message = error instanceof Error ? error.message : "The assistant is unavailable right now.";
        setMessages((current) => current.map((item) => item.id === replyId ? { ...item, text: message.slice(0, 300) } : item));
      }
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    abortRef.current?.abort();
    setMessages([welcome]);
    setSuggestions(baseSuggestions);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* Storage may be unavailable. */ }
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((value) => !value)}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.7, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={reduceMotion ? undefined : { scale: 1.06 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        aria-label={open ? "Close Joe Grand AI support chat" : "Open Joe Grand AI support chat"}
        aria-expanded={open}
        aria-controls="joegrand-live-chat"
        className="live-chat-launcher"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? <motion.span key="close" initial={{ rotate: -80, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 80, opacity: 0 }}><X size={23} /></motion.span> : <motion.span key="bot" initial={{ rotate: 60, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -60, opacity: 0 }}><Bot size={25} /></motion.span>}
        </AnimatePresence>
        {!open && <motion.span className="live-chat-pulse" animate={reduceMotion ? undefined : { scale: [1, 1.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.section
            id="joegrand-live-chat"
            role="dialog"
            aria-label="Joe Grand AI support chat"
            aria-modal="false"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="live-chat-panel"
          >
            <header className="live-chat-header">
              <div className="live-chat-avatar"><Sparkles size={20} /><span /></div>
              <div className="live-chat-heading"><strong>Joe Grand AI Assistant</strong><small><i /> WEBSITE SUPPORT · AI ASSISTANT</small></div>
              <button type="button" className="live-chat-icon-button" onClick={clearChat} aria-label="Clear conversation"><Trash2 size={16} /></button>
              <button type="button" className="live-chat-icon-button" onClick={() => setOpen(false)} aria-label="Close chat"><X size={18} /></button>
            </header>

            <div className="live-chat-messages" aria-live="polite" aria-relevant="additions text">
              {messages.map((message) => (
                <motion.div key={message.id} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`live-chat-row ${message.sender === "user" ? "is-user" : "is-bot"}`}>
                  {message.sender === "bot" && <span className="live-chat-message-icon"><Bot size={15} /></span>}
                  <div className={`live-chat-bubble ${message.sender === "user" ? "user-bubble" : "bot-bubble"}`}>
                    {message.sender === "bot" ? <ReactMarkdown components={{ a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}<ExternalLink size={11} /></a>, ul: ({ children }) => <ul>{children}</ul>, strong: ({ children }) => <strong>{children}</strong> }}>{message.text}</ReactMarkdown> : message.text}
                    {loading && message.sender === "bot" && !message.text && <span className="chat-typing" aria-label="Assistant is responding"><i /><i /><i /></span>}
                  </div>
                  {message.sender === "user" && <span className="live-chat-message-icon user-icon"><User size={15} /></span>}
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="live-chat-suggestions">
              <span className="chat-overline">SUGGESTED QUESTIONS</span>
              <div>{suggestions.map((suggestion) => <button key={suggestion} type="button" disabled={loading} onClick={() => sendMessage(suggestion)}>{suggestion}</button>)}</div>
            </div>

            <form className="live-chat-form" onSubmit={(event) => { event.preventDefault(); void sendMessage(input); }}>
              <label className="sr-only" htmlFor="live-chat-input">Your message</label>
              <input id="live-chat-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask a question..." autoComplete="off" maxLength={2000} />
              <button type="submit" aria-label="Send message" disabled={loading || !input.trim()}><Send size={17} /></button>
            </form>
            <p className="live-chat-disclaimer">AI-generated answers may be incomplete. For formal enquiries, use <a href="https://joegrand.com/" target="_blank" rel="noopener noreferrer">Joe’s official website</a>.</p>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
