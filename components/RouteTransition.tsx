"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Radio } from "lucide-react";

type Transition = { label: string } | null;

const labels: Record<string, string> = {
  "/": "Home",
  "/about": "About Joe",
  "/projects": "Projects",
  "/videos": "Video archive",
  "/training": "Training",
  "/community": "Community",
  "/contact": "Contact",
  "/badge-lab": "Badge Lab",
  "/privacy": "Privacy",
};

function routeLabel(pathname: string) {
  return labels[pathname] || "Next page";
}

export default function RouteTransition() {
  const pathname = usePathname();
  const [transition, setTransition] = useState<Transition>(null);

  useEffect(() => {
    function beginTransition(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target || link.hasAttribute("download")) return;

      const destination = new URL(link.href, window.location.href);
      const current = new URL(window.location.href);
      const isSameDocument = destination.pathname === current.pathname && destination.search === current.search;
      if (destination.origin !== current.origin || isSameDocument) return;

      setTransition({ label: routeLabel(destination.pathname) });
    }

    document.addEventListener("click", beginTransition, true);
    return () => document.removeEventListener("click", beginTransition, true);
  }, []);

  useEffect(() => {
    if (!transition) return;
    const completed = window.setTimeout(() => setTransition(null), 380);
    return () => window.clearTimeout(completed);
  }, [pathname, transition]);

  useEffect(() => {
    if (!transition) return;
    const fallback = window.setTimeout(() => setTransition(null), 7000);
    return () => window.clearTimeout(fallback);
  }, [transition]);

  return (
    <div className={`route-transition ${transition ? "is-active" : ""}`} aria-hidden={!transition}>
      <div className="route-transition-bar"><span /></div>
      <div className="route-transition-status" role="status" aria-live="polite">
        <Radio size={16} aria-hidden="true" />
        <span>Loading <b>{transition?.label || "page"}</b></span>
      </div>
    </div>
  );
}
