"use client";

import * as motion from "motion/react-client";
import Link from "next/link";

type Project = {
  id: string;
  name: string;
  image: string;
  niche: string;
  reviewCount?: string;
  rating?: string;
  location?: string;
};

type CityDict = {
  name: string;
  label: string;
  headline: string;
  description: string;
  stats: Record<string, string>;
  statsLabels: Record<string, string>;
  projectsLabel: string;
  projectsHeadline: string;
  viewProject: string;
  cta: string;
  ctaDescription: string;
  ctaButton: string;
  disclaimer: string;
};

export default function CityLanding({
  dict,
  projects,
  lang,
}: {
  dict: CityDict;
  projects: Project[];
  lang: string;
}) {
  const statKeys = ["projects", "avgRating", "totalReviews", "niches"] as const;

  return (
    <>
      {/* Hero */}
      <section className="relative z-[5] overflow-hidden px-6 pt-32 pb-20 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[2px] text-muted">
            {dict.label}
          </span>
          <h1
            className="mt-4 font-sans font-extralight leading-[0.9] tracking-[-1px]"
            style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
          >
            {dict.headline}
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted">
            {dict.description}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {statKeys.map((key) => (
            <div key={key}>
              <span
                className="block font-sans font-extralight tracking-[-1px]"
                style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
              >
                {dict.stats[key]}
              </span>
              <span className="mt-1 block font-mono text-[9px] uppercase tracking-[2px] text-muted">
                {dict.statsLabels[key]}
              </span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Projects grid */}
      <section className="relative z-[5] overflow-hidden px-6 pb-24 md:px-10">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[2px] text-muted">
            {dict.projectsLabel}
          </span>
          <h2
            className="mt-4 text-2xl font-extralight tracking-[-0.5px]"
          >
            {dict.projectsHeadline}
          </h2>
          <div className="mt-4 h-px w-full bg-muted/20" />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.3) }}
            >
              <Link
                href={`/${lang}/projects/${project.id}`}
                className="group relative block aspect-[4/3] overflow-hidden border border-muted/20 bg-muted/5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <span className="font-mono text-[9px] uppercase tracking-[2px] text-muted">
                    {project.niche}
                  </span>
                  {(project.reviewCount || project.rating) && (
                    <span className="mt-1 block font-mono text-[9px] tracking-[1px] text-foreground/70">
                      {project.rating && `${project.rating}\u2605`}
                      {project.reviewCount && project.rating && " \u00b7 "}
                      {project.reviewCount && `${project.reviewCount} reviews`}
                    </span>
                  )}
                  <h3 className="mt-2 text-lg font-light tracking-[-0.5px]">
                    {project.name}
                  </h3>
                  <div className="mt-4 flex items-center gap-3 opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
                    <span className="font-mono text-[10px] uppercase tracking-[2px] text-muted">
                      {dict.viewProject}
                    </span>
                    <div className="h-px w-8 bg-foreground transition-all duration-300 group-hover:w-16" />
                  </div>
                </div>
                <div className="absolute top-4 right-4 h-6 w-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute top-0 right-0 h-full w-px bg-foreground" />
                  <div className="absolute top-0 right-0 h-px w-full bg-foreground" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Demo disclaimer (legal) */}
        <p className="mt-10 max-w-2xl font-mono text-[10px] leading-relaxed tracking-[0.5px] text-muted/60">
          {dict.disclaimer}
        </p>
      </section>

      {/* CTA */}
      <section className="relative z-[5] overflow-hidden px-6 pb-32 md:px-10">
        <motion.div
          className="flex flex-col items-center justify-center py-20 border border-muted/20 bg-muted/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-xl font-extralight tracking-[-0.5px] md:text-2xl">
            {dict.cta}
          </h2>
          <p className="mt-4 max-w-md text-center text-sm text-muted">
            {dict.ctaDescription}
          </p>
          <a
            href={`/${lang}#contact`}
            className="group mt-8 inline-flex items-center gap-5 transition-transform duration-300 ease-out hover:translate-x-[10px]"
          >
            <span className="text-xs uppercase tracking-[3px]">
              {dict.ctaButton}
            </span>
            <div className="h-px w-[60px] bg-foreground transition-all duration-300 group-hover:w-[100px]" />
          </a>
        </motion.div>
      </section>
    </>
  );
}
