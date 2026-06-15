"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";

type Project = {
  id: string;
  name: string;
  category: string;
  image: string;
  url: string;
  description: string;
  services: string[];
  niche: string;
  reviewCount?: string;
  rating?: string;
  location?: string;
};

type ProjectsPageDict = {
  label: string;
  headline: string;
  description: string;
  disclaimer: string;
  projectCount: string;
  nicheNav: { id: string; label: string }[];
  nicheNavLabel: string;
  cityFilterLabel: string;
  cityFilterAll: string;
  categories: {
    webDevelopment: {
      title: string;
      tag: string;
      description: string;
    };
    automations: {
      title: string;
      tag: string;
      description: string;
      comingSoon: string;
      comingSoonCta: string;
    };
  };
  cta: string;
};

function slugify(niche: string) {
  return niche.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
}

function ProjectCard({
  project,
  lang,
  cta,
  index,
}: {
  project: Project;
  lang: string;
  cta: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.3) }}
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
            {project.location && ` · ${project.location}`}
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
              {cta}
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
  );
}

export default function ProjectsGallery({
  dict,
  portfolio,
  lang,
}: {
  dict: ProjectsPageDict;
  portfolio: {
    projects: Project[];
    cta: string;
  };
  lang: string;
}) {
  // TEMP: hide projects for interested prospects (remove when no longer needed)
  const HIDDEN_IDS = ["revicar", "vet-lpda", "laundry-grace", "barbershop-specialone", "harvey", "mm-detalhe", "autobody-jpautopaint"];
  const visibleProjects = portfolio.projects.filter((p) => !HIDDEN_IDS.includes(p.id));

  const [cityFilter, setCityFilter] = useState<string | null>(null);

  // Get unique cities sorted by count
  const cityCounts: Record<string, number> = {};
  for (const p of visibleProjects) {
    if (p.location) cityCounts[p.location] = (cityCounts[p.location] || 0) + 1;
  }
  const cities = Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])
    .filter(([, count]) => count >= 3);

  // Filter projects by city if active
  const filteredProjects = cityFilter
    ? visibleProjects.filter((p) => p.location === cityFilter)
    : visibleProjects;

  // Map niche display names to stable nav IDs by matching labels
  const nicheToNavId: Record<string, string> = {};
  for (const nav of dict.nicheNav) {
    nicheToNavId[nav.label] = nav.id;
  }

  // Group projects by niche
  const nicheGroups: Record<string, Project[]> = {};
  for (const project of filteredProjects) {
    if (!nicheGroups[project.niche]) {
      nicheGroups[project.niche] = [];
    }
    nicheGroups[project.niche].push(project);
  }

  // Sort niche groups to match nicheNav order
  const navOrder = dict.nicheNav.map((n) => n.label);
  const sortedNicheEntries = Object.entries(nicheGroups).sort(
    (a, b) => (navOrder.indexOf(a[0]) === -1 ? 999 : navOrder.indexOf(a[0])) -
              (navOrder.indexOf(b[0]) === -1 ? 999 : navOrder.indexOf(b[0]))
  );

  return (
    <section className="relative z-[5] overflow-hidden px-6 pt-32 pb-24 md:px-10">
      {/* Page header */}
      <motion.div
        className="mb-20"
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
        <span className="mt-3 block font-mono text-[10px] uppercase tracking-[2px] text-foreground/50">
          {dict.projectCount}
        </span>
        <p className="mt-6 max-w-lg font-mono text-[10px] leading-relaxed tracking-[0.5px] text-muted/60">
          {dict.disclaimer}
        </p>

        {/* City filter */}
        <div className="mt-8">
          <span className="mb-2 block font-mono text-[8px] uppercase tracking-[2px] text-muted/60">
            {dict.cityFilterLabel}
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCityFilter(null)}
              className={`rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[1.5px] transition-all duration-200 ${
                !cityFilter
                  ? "border-foreground/30 text-foreground bg-foreground/5"
                  : "border-muted/20 text-muted/60 hover:text-foreground/70 hover:border-muted/40"
              }`}
            >
              {dict.cityFilterAll}
            </button>
            {cities.map(([city, count]) => (
              <button
                key={city}
                onClick={() => setCityFilter(cityFilter === city ? null : city)}
                className={`rounded-full border px-3 py-1 font-mono text-[9px] uppercase tracking-[1.5px] transition-all duration-200 ${
                  cityFilter === city
                    ? "border-foreground/30 text-foreground bg-foreground/5"
                    : "border-muted/20 text-muted/60 hover:text-foreground/70 hover:border-muted/40"
                }`}
              >
                {city} ({count})
              </button>
            ))}
          </div>
        </div>
      </motion.div>
        {/* Category: Web Development */}
        <div className="mb-24">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="font-mono text-[10px] text-muted">
                {dict.categories.webDevelopment.tag}
              </span>
              <h2 className="text-2xl font-light tracking-[-0.5px]">
                {dict.categories.webDevelopment.title}
              </h2>
            </div>
            <p className="text-sm text-muted mb-6">
              {dict.categories.webDevelopment.description}
            </p>
            <div className="h-px w-full bg-muted/20" />
          </motion.div>

          {/* Niche groups */}
          {sortedNicheEntries.map(([niche, projects]) => (
            <div key={niche} id={nicheToNavId[niche] ?? slugify(niche)} className="mb-16 last:mb-0 scroll-mt-28">
              <motion.div
                className="mb-6 flex items-center justify-between"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-4 w-px bg-foreground" />
                  <h3 className="font-mono text-[10px] uppercase tracking-[2px] text-muted">
                    {niche}
                  </h3>
                </div>
                <span className="font-mono text-[9px] text-muted/50">
                  {projects.length}
                </span>
              </motion.div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    lang={lang}
                    cta={dict.cta}
                    index={i}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Category: Automations & Chatbots */}
        <div>
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-3">
              <span className="font-mono text-[10px] text-muted">
                {dict.categories.automations.tag}
              </span>
              <h2 className="text-2xl font-light tracking-[-0.5px]">
                {dict.categories.automations.title}
              </h2>
            </div>
            <p className="text-sm text-muted mb-6">
              {dict.categories.automations.description}
            </p>
            <div className="h-px w-full bg-muted/20" />
          </motion.div>

          {/* Coming soon state */}
          <motion.div
            className="flex flex-col items-center justify-center py-20 border border-dashed border-muted/20 bg-muted/5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[2px] text-muted mb-4">
              {dict.categories.automations.comingSoon}
            </p>
            <a
              href={`/${lang}#contact`}
              className="group inline-flex items-center gap-4 transition-transform duration-300 ease-out hover:translate-x-[6px]"
            >
              <span className="text-xs uppercase tracking-[2px] text-muted group-hover:text-foreground transition-colors duration-300">
                {dict.categories.automations.comingSoonCta}
              </span>
              <div className="h-px w-[40px] bg-foreground transition-all duration-300 group-hover:w-[70px]" />
            </a>
          </motion.div>
        </div>
    </section>
  );
}
