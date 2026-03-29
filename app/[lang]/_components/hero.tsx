"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import BackgroundSphere from "./background-sphere";

export default function Hero({
  dict,
}: {
  dict: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    meta: { label: string; value: string }[];
    ctaServices: string;
    ctaWork: string;
    ctaContact: string;
    sidebar: string;
    coords: { lat: string; lng: string };
    signature: string;
  };
}) {
  const [clock, setClock] = useState("00:00:00:00");
  const { theme } = useTheme();

  // Live clock
  useEffect(() => {
    let frameId: number;
    const updateClock = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      const s = now.getSeconds().toString().padStart(2, "0");
      const ms = Math.floor(now.getMilliseconds() / 10)
        .toString()
        .padStart(2, "0");
      setClock(`${h}:${m}:${s}:${ms}`);
      frameId = requestAnimationFrame(updateClock);
    };
    updateClock();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Scanline */}
      <div
        className="pointer-events-none fixed left-0 z-[100] h-px w-full"
        style={{
          background:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
          animation: "scan 8s linear infinite",
        }}
      />

      {/* Three.js background */}
      <BackgroundSphere includeTorus />

      {/* Main content */}
      <div className="relative z-[5] flex h-screen flex-col justify-center pl-[10%]">
        {/* Meta labels */}
        <div className="mb-5 flex gap-[30px] font-mono text-[9px] tracking-[1px] text-muted">
          {dict.meta.map((m, i) => (
            <p key={m.label} className={i === dict.meta.length - 1 ? "hidden md:block" : ""}>
              {m.label}: <span className="text-foreground">{m.value}</span>
            </p>
          ))}
        </div>

        {/* Hero title */}
        <h1
          className="font-sans leading-[0.9] font-extralight tracking-[-2px]"
          style={{ fontSize: "clamp(40px, 8vw, 100px)" }}
        >
          {dict.titleLine1}
          <br />
          {dict.titleLine2}
        </h1>

        <p className="mt-4 font-mono text-sm uppercase tracking-[4px] text-muted">
          {dict.subtitle}
        </p>

        {/* CTAs */}
        <div className="mt-[60px] flex flex-col gap-6">
          <a href="#services" className="group inline-flex cursor-pointer items-center gap-5 transition-transform duration-300 ease-out hover:translate-x-[10px]">
            <span className="text-xs uppercase tracking-[3px]">{dict.ctaServices}</span>
            <div className="h-px w-[100px] bg-foreground" />
          </a>
          <a href="#work" className="group inline-flex cursor-pointer items-center gap-5 transition-transform duration-300 ease-out hover:translate-x-[10px]">
            <span className="text-xs uppercase tracking-[3px]">{dict.ctaWork}</span>
            <div className="h-px w-[100px] bg-foreground" />
          </a>
          <a href="#contact" className="group inline-flex cursor-pointer items-center gap-5 transition-transform duration-300 ease-out hover:translate-x-[10px]">
            <span className="text-xs uppercase tracking-[3px]">{dict.ctaContact}</span>
            <div className="h-px w-[100px] bg-foreground" />
          </a>
        </div>
      </div>

      {/* Sidebar vertical text */}
      <div className="fixed right-10 top-1/2 z-[5] hidden -translate-y-1/2 border-r border-muted/50 pr-[10px] text-[10px] uppercase tracking-[8px] text-muted [writing-mode:vertical-rl] md:block">
        {dict.sidebar}
      </div>

      {/* Coordinates + clock */}
      <div className="fixed bottom-10 left-10 z-[5] font-mono text-[8px] leading-[1.6] text-muted">
        LAT: {dict.coords.lat}
        <br />
        LNG: {dict.coords.lng}
        <br />
        SYSTEM_CLOCK: <span id="clock">{clock}</span>
      </div>

      {/* Stipple grid */}
      <div className="stipple-grid fixed bottom-10 right-10 z-[1] h-[120px] w-[200px] opacity-40" />

      {/* Logo watermark */}
      <div className="fixed top-10 right-32 z-[3] hidden opacity-[0.03] md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/sgx-logo.jpg"
          alt=""
          width={300}
          height={300}
          className={theme === "dark" ? "invert" : ""}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
