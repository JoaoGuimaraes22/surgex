"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "./theme-provider";
import LocaleSwitcher from "./locale-switcher";

export default function Navbar({
  dict,
  hideLinks = false,
  backHref,
}: {
  dict: {
    brand: string;
    version: string;
    cta: string;
    links: { id: string; label: string }[];
  };
  hideLinks?: boolean;
  backHref?: string;
}) {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 z-20 flex w-full items-center justify-between p-6 md:items-start md:px-10 md:pt-6 md:pb-10"
      >
        {/* Brand */}
        <a
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/sgx-logo-no-bg.png"
            alt={dict.brand}
            className={`h-10 w-auto md:h-16 ${theme === "dark" ? "invert" : ""}`}
          />
          <span className="hidden font-normal text-sm text-muted md:block">{dict.version}</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 md:flex">
          {backHref && (
            <Link
              href={backHref}
              className="flex items-center gap-2 text-[10px] uppercase tracking-[2px] text-muted transition-colors duration-300 hover:text-foreground"
            >
              <span className="text-sm">←</span> Go Back
            </Link>
          )}

          {!hideLinks && dict.links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="group flex items-center gap-[10px] rounded-full backdrop-blur-sm bg-background/8 px-1.5 py-0.5 text-[10px] uppercase tracking-[2px] text-muted transition-colors duration-300 hover:text-foreground"
            >
              <span className="text-lg font-extralight text-foreground">(</span>
              {link.label}
              <span className="text-lg font-extralight text-foreground">)</span>
            </a>
          ))}

          <LocaleSwitcher />

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
            <LocaleSwitcher />
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

      {/* Mobile overlay */}
      {!hideLinks && (
      <div
        className={`fixed inset-0 z-[15] bg-background transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-10">
          {dict.links.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 text-[11px] uppercase tracking-[3px] text-muted transition-colors duration-300 hover:text-foreground"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.4s ${i * 0.08}s, transform 0.4s ${i * 0.08}s, color 0.3s`,
              }}
            >
              <span className="text-xl font-extralight text-foreground">(</span>
              {link.label}
              <span className="text-xl font-extralight text-foreground">)</span>
            </a>
          ))}

          {/* Locale + theme row */}
          <div
            className="mt-6 flex items-center gap-8"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.4s ${dict.links.length * 0.08}s, transform 0.4s ${dict.links.length * 0.08}s`,
            }}
          >
            <LocaleSwitcher />

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
