"use client";

import { motion } from "motion/react";
import { useTheme } from "./theme-provider";

export default function ProjectShowcase({
  project,
  portfolio,
  lang,
}: {
  project: {
    id: string;
    name: string;
    category: string;
    image: string;
    url: string;
    description: string;
    services: string[];
    niche: string;
  };
  portfolio: {
    back: string;
    visitSite: string;
    servicesLabel: string;
    nicheLabel: string;
  };
  lang: string;
}) {
  const { theme } = useTheme();

  return (
    <div className="relative z-[5] min-h-screen px-6 pt-32 pb-32 md:px-10">
      <div className="grid gap-16 md:grid-cols-2">
        {/* Left — project image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[4/3] overflow-hidden border border-muted/20"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.name}
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Right — project info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col"
        >
          {/* Category */}
          <span className="font-mono text-[9px] uppercase tracking-[2px] text-muted">
            {project.category}
          </span>

          {/* Name */}
          <h1
            className="mt-4 font-sans font-extralight leading-[0.9] tracking-[-1px]"
            style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
          >
            {project.name}
          </h1>

          {/* Divider */}
          <div className="my-8 h-px w-16 bg-muted" />

          {/* Description */}
          <p className="max-w-md text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          {/* Meta */}
          <div className="mt-10 flex flex-col gap-6">
            <div>
              <span className="font-mono text-[8px] uppercase tracking-[2px] text-muted">
                {portfolio.nicheLabel}
              </span>
              <p className="mt-1 text-sm">{project.niche}</p>
            </div>

            <div>
              <span className="font-mono text-[8px] uppercase tracking-[2px] text-muted">
                {portfolio.servicesLabel}
              </span>
              <ul className="mt-2 flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <li
                    key={s}
                    className="border border-muted/30 px-3 py-1 font-mono text-[9px] uppercase tracking-[1px] text-muted"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Visit site CTA */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-12 inline-flex w-fit items-center gap-5 transition-transform duration-300 ease-out hover:translate-x-[10px]"
          >
            <span className="text-xs uppercase tracking-[3px]">
              {portfolio.visitSite}
            </span>
            <div className="h-px w-[60px] bg-foreground transition-all duration-300 group-hover:w-[100px]" />
          </a>
        </motion.div>
      </div>

      {/* Live site embed */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-24"
      >
        <span className="mb-4 block font-mono text-[9px] uppercase tracking-[2px] text-muted">
          LIVE_PREVIEW
        </span>
        <div className="relative h-[85vh] overflow-hidden border border-muted/20 md:h-0 md:pb-[56.25%]">
          <iframe
            src={project.url}
            title={project.name}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  );
}
