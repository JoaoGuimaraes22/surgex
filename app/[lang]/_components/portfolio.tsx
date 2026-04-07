"use client";

import * as motion from "motion/react-client";
import Link from "next/link";

export default function Portfolio({
  dict,
  lang,
}: {
  dict: {
    label: string;
    headline: string;
    projects: {
      id: string;
      name: string;
      category: string;
      image: string;
      url: string;
      niche?: string;
      reviewCount?: string;
      rating?: string;
      location?: string;
    }[];
    cta: string;
    seeMore: string;
  };
  lang: string;
}) {
  // Pick first 6 unique niches for diverse homepage showcase
  const featured: typeof dict.projects = [];
  const seen = new Set<string>();
  for (const p of dict.projects) {
    const key = p.niche ?? p.category;
    if (!seen.has(key) && featured.length < 6) {
      featured.push(p);
      seen.add(key);
    }
  }

  return (
    <section id="work" className="relative z-[5] overflow-hidden py-32 px-10">
      {/* Section label */}
      <div className="mb-16">
        <span className="font-mono text-[9px] uppercase tracking-[2px] text-muted">
          {dict.label}
        </span>
        <h2
          className="mt-4 font-sans font-extralight leading-[0.9] tracking-[-1px]"
          style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
        >
          {dict.headline}
        </h2>
      </div>

      {/* Project grid — 6 diverse niches on homepage */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
          <Link
            href={`/${lang}/projects/${project.id}`}
            className="group relative block aspect-[4/3] overflow-hidden border border-muted/20 bg-muted/5"
          >
            {/* Project image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.name}
              className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

            {/* Project info */}
            <div className="absolute bottom-0 left-0 w-full p-6">
              <span className="font-mono text-[9px] uppercase tracking-[2px] text-muted">
                {project.category}
                {project.location && ` · ${project.location}`}
              </span>
              {(project.reviewCount || project.rating) && (
                <span className="mt-1 block font-mono text-[9px] tracking-[1px] text-foreground/70">
                  {project.rating && `${project.rating}★`}
                  {project.reviewCount && project.rating && " · "}
                  {project.reviewCount && `${project.reviewCount} reviews`}
                </span>
              )}
              <h3 className="mt-2 text-lg font-light tracking-[-0.5px]">
                {project.name}
              </h3>

              {/* CTA line */}
              <div className="mt-4 flex items-center gap-3 opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                <span className="font-mono text-[10px] uppercase tracking-[2px] text-muted">
                  {dict.cta}
                </span>
                <div className="h-px w-8 bg-foreground transition-all duration-300 group-hover:w-16" />
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-4 right-4 h-6 w-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute top-0 right-0 h-full w-px bg-foreground" />
              <div className="absolute top-0 right-0 h-px w-full bg-foreground" />
            </div>
          </Link>
          </motion.div>
        ))}
      </div>

      {/* See More CTA */}
      <div className="mt-16 flex justify-center">
        <Link
          href={`/${lang}/projects`}
          className="group inline-flex items-center gap-5 transition-transform duration-300 ease-out hover:translate-x-[10px]"
        >
          <span className="text-xs uppercase tracking-[3px] text-muted group-hover:text-foreground transition-colors duration-300">
            {dict.seeMore}
          </span>
          <div className="h-px w-[60px] bg-foreground transition-all duration-300 group-hover:w-[100px]" />
        </Link>
      </div>
    </section>
  );
}
