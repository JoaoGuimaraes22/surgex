"use client";

import { useTheme } from "./theme-provider";
import LocaleSwitcher from "./locale-switcher";

export default function Navbar({
  dict,
}: {
  dict: {
    brand: string;
    version: string;
    cta: string;
    links: { id: string; label: string }[];
  };
}) {
  const { theme, toggle } = useTheme();

  return (
    <header className="fixed top-0 left-0 z-10 flex w-full items-start justify-between p-10">
      {/* Brand */}
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sgx-logo-no-bg.png"
          alt={dict.brand}
          className={`h-16 w-auto ${theme === "dark" ? "invert" : ""}`}
        />
        <span className="font-normal text-sm text-muted">{dict.version}</span>
      </div>

      {/* Bracketed navigation */}
      <nav className="flex items-center gap-10">
        {dict.links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="group flex items-center gap-[10px] text-[10px] uppercase tracking-[2px] text-muted transition-colors duration-300 hover:text-foreground"
          >
            <span className="text-lg font-extralight text-foreground">(</span>
            {link.label}
            <span className="text-lg font-extralight text-foreground">)</span>
          </a>
        ))}

        {/* Locale switcher */}
        <LocaleSwitcher />

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="ml-4 flex h-6 w-6 items-center justify-center text-muted transition-colors duration-300 hover:text-foreground"
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
}
