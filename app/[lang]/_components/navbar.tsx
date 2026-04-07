"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "./theme-provider";
import LocaleSwitcher from "./locale-switcher";

export default function Navbar({
  dict,
  hideLinks = false,
  backHref,
  lang,
  alternates,
  nicheNav,
}: {
  dict: {
    brand: string;
    version: string;
    cta: string;
    links: { id: string; label: string; href?: string }[];
  };
  hideLinks?: boolean;
  backHref?: string;
  lang?: string;
  alternates?: Record<string, string>;
  nicheNav?: { items: { id: string; label: string }[]; label: string };
}) {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNiche, setActiveNiche] = useState(nicheNav?.items[0]?.id ?? "");
  const nicheScrollRef = useRef<HTMLDivElement>(null);
  const nicheItemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which niche section is in view
  useEffect(() => {
    if (!nicheNav) return;
    const observers: IntersectionObserver[] = [];
    for (const item of nicheNav.items) {
      const el = document.getElementById(item.id);
      if (!el) continue;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveNiche(item.id);
        },
        { rootMargin: "-20% 0px -60% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, [nicheNav]);

  // Auto-scroll active niche pill into view
  useEffect(() => {
    const btn = nicheItemRefs.current[activeNiche];
    if (btn && nicheScrollRef.current) {
      const container = nicheScrollRef.current;
      const left = btn.offsetLeft - container.offsetWidth / 2 + btn.offsetWidth / 2;
      container.scrollTo({ left, behavior: "smooth" });
    }
  }, [activeNiche]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-20 flex w-full items-center justify-between p-6 md:px-10 md:pt-6 md:pb-4 ${nicheNav ? "bg-background/80 backdrop-blur-md border-b border-muted/10" : "md:items-start md:pb-10"}`}
      >
        {/* Brand + back */}
        <div className="flex shrink-0 items-center gap-4">
          <a
            href={backHref ?? (lang ? `/${lang}` : "#")}
            onClick={!backHref && !lang ? () => window.scrollTo({ top: 0, behavior: "smooth" }) : undefined}
            className="flex items-center gap-3"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/sgx-logo-no-bg.png"
              alt={dict.brand}
              className={`h-10 w-auto ${nicheNav ? "" : "md:h-16"} ${theme === "dark" ? "invert" : ""}`}
            />
            {!nicheNav && (
              <span className="hidden font-normal text-sm text-muted md:block">{dict.version}</span>
            )}
          </a>

          {backHref && (
            <Link
              href={backHref}
              className="hidden items-center gap-1.5 border border-muted/30 rounded-full px-2.5 py-1 text-[9px] uppercase tracking-[2px] text-muted transition-colors duration-300 hover:text-foreground hover:border-foreground/30 md:flex"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span>Back</span>
            </Link>
          )}
        </div>

        {/* Desktop: niche nav pills with scroll arrows */}
        {nicheNav && (
          <div className="hidden min-w-0 flex-1 items-center gap-1 mx-4 md:flex">
            <button
              onClick={() => nicheScrollRef.current?.scrollBy({ left: -200, behavior: "smooth" })}
              className="shrink-0 flex h-6 w-6 items-center justify-center text-foreground/60 hover:text-foreground transition-colors duration-200"
              aria-label="Scroll left"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <div
              ref={nicheScrollRef}
              className="flex min-w-0 flex-1 gap-1 overflow-x-auto scrollbar-hide"
            >
              {nicheNav.items.map((item) => (
                <button
                  key={item.id}
                  ref={(el) => { nicheItemRefs.current[item.id] = el; }}
                  onClick={() => {
                    const el = document.getElementById(item.id);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={`shrink-0 rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[1.5px] transition-all duration-200 ${
                    activeNiche === item.id
                      ? "text-foreground bg-foreground/10"
                      : "text-muted/60 hover:text-foreground/70"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => nicheScrollRef.current?.scrollBy({ left: 200, behavior: "smooth" })}
              className="shrink-0 flex h-6 w-6 items-center justify-center text-foreground/60 hover:text-foreground transition-colors duration-200"
              aria-label="Scroll right"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}

        {/* Desktop nav (standard links) */}
        <nav className={`hidden items-center gap-10 md:flex ${nicheNav ? "shrink-0" : ""}`}>
          {!nicheNav && backHref && (
            <Link
              href={backHref}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[2px] text-muted transition-colors duration-300 hover:text-foreground"
            >
              <span className="text-sm">&larr;</span> Go Back
            </Link>
          )}

          {!hideLinks && dict.links.map((link) =>
            link.href ? (
              <Link
                key={link.id}
                href={link.href}
                className="group flex items-center gap-[10px] rounded-full backdrop-blur-sm bg-background/8 px-1.5 py-0.5 text-[10px] uppercase tracking-[2px] text-muted transition-colors duration-300 hover:text-foreground"
              >
                <span className="text-lg font-extralight text-foreground">(</span>
                {link.label}
                <span className="text-lg font-extralight text-foreground">)</span>
              </Link>
            ) : (
              <a
                key={link.id}
                href={lang ? `/${lang}#${link.id}` : `#${link.id}`}
                className="group flex items-center gap-[10px] rounded-full backdrop-blur-sm bg-background/8 px-1.5 py-0.5 text-[10px] uppercase tracking-[2px] text-muted transition-colors duration-300 hover:text-foreground"
              >
                <span className="text-lg font-extralight text-foreground">(</span>
                {link.label}
                <span className="text-lg font-extralight text-foreground">)</span>
              </a>
            )
          )}

          <LocaleSwitcher alternates={alternates} />

          <button
            onClick={toggle}
            className="ml-4 flex h-6 w-6 items-center justify-center text-muted transition-colors duration-300 hover:text-foreground"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile: show locale + theme when no links, hamburger otherwise */}
        {hideLinks ? (
          <div className="flex items-center gap-4 md:hidden">
            {backHref && (
              <Link
                href={backHref}
                className="flex items-center gap-1 text-[10px] uppercase tracking-[2px] text-muted transition-colors duration-300 hover:text-foreground"
              >
                <span className="text-sm">←</span>
              </Link>
            )}
            <LocaleSwitcher alternates={alternates} />
            <button
              onClick={toggle}
              className="flex h-8 w-8 items-center justify-center text-muted transition-colors duration-300 hover:text-foreground"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        ) : (
        <button
          onClick={() => setOpen(!open)}
          className="relative z-30 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span
            className={`h-px w-5 bg-foreground transition-all duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-foreground transition-all duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
        )}
      </header>

      {/* Mobile niche nav row */}
      {nicheNav && (
        <div className="fixed top-[58px] left-0 z-20 w-full border-b border-muted/10 bg-background/80 backdrop-blur-md md:hidden">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide px-4 py-2">
            {nicheNav.items.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[8px] uppercase tracking-[1px] transition-all duration-200 ${
                  activeNiche === item.id
                    ? "text-foreground bg-foreground/10"
                    : "text-muted/60"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile overlay */}
      {!hideLinks && (
      <div
        className={`fixed inset-0 z-[15] bg-background transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-10">
          {dict.links.map((link, i) => {
            const cls = "flex items-center gap-3 text-[11px] uppercase tracking-[3px] text-muted transition-colors duration-300 hover:text-foreground";
            const st = {
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.4s ${i * 0.08}s, transform 0.4s ${i * 0.08}s, color 0.3s`,
            };
            const inner = (
              <>
                <span className="text-xl font-extralight text-foreground">(</span>
                {link.label}
                <span className="text-xl font-extralight text-foreground">)</span>
              </>
            );
            return link.href ? (
              <Link key={link.id} href={link.href} onClick={() => setOpen(false)} className={cls} style={st}>
                {inner}
              </Link>
            ) : (
              <a key={link.id} href={lang ? `/${lang}#${link.id}` : `#${link.id}`} onClick={() => setOpen(false)} className={cls} style={st}>
                {inner}
              </a>
            );
          })}

          {/* Locale + theme row */}
          <div
            className="mt-6 flex items-center gap-8"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.4s ${dict.links.length * 0.08}s, transform 0.4s ${dict.links.length * 0.08}s`,
            }}
          >
            <LocaleSwitcher alternates={alternates} />

            <button
              onClick={toggle}
              className="flex h-8 w-8 items-center justify-center text-muted transition-colors duration-300 hover:text-foreground"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </nav>
      </div>
      )}
    </>
  );
}
