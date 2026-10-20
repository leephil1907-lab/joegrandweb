"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Consent = "granted" | "denied" | null;
type AnalyticsConsentProps = { enabled: boolean };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const storageKey = "joegrand-google-analytics-consent";

export default function AnalyticsConsent({ enabled }: AnalyticsConsentProps) {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  function apply(next: Exclude<Consent, null>) {
    window.gtag?.("consent", "update", {
      analytics_storage: next,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }

  useEffect(() => {
    if (!enabled) return;
    const saved = window.localStorage.getItem(storageKey) as Consent;
    const next = saved === "granted" || saved === "denied" ? saved : null;
    setConsent(next);
    setReady(true);
    if (next) apply(next);
  }, [enabled]);

  useEffect(() => {
    if (consent !== "granted") return;
    window.gtag?.("event", "page_view", { page_path: pathname, page_location: window.location.href, page_title: document.title });
  }, [pathname, consent]);

  if (!enabled || !ready || consent) return null;

  function choose(next: Exclude<Consent, null>) {
    window.localStorage.setItem(storageKey, next);
    apply(next);
    setConsent(next);
  }

  return (
    <aside className="analytics-consent" aria-label="Analytics preference">
      <p><strong>Analytics preference</strong> — Allow privacy-conscious Google Analytics to help improve this site? Analytics are off unless you opt in.</p>
      <div><button type="button" onClick={() => choose("denied")}>No thanks</button><button type="button" onClick={() => choose("granted")}>Allow analytics</button></div>
    </aside>
  );
}
