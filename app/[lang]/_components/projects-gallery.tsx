"use client";

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
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        href={`/${lang}/projects/${project.id}`}
        className="group relative block aspect-[4/3] overflow-hidden border border-muted/20 bg-muted/5"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.name}
          className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
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
  // Group web dev projects by niche (preserving dict order)
  const webProjects = portfolio.projects.filter(
    (p) => p.category === "Website"
  );
  const nicheGroups: Record<string, Project[]> = {};
  for (const project of webProjects) {
    if (!nicheGroups[project.niche]) {
      nicheGroups[project.niche] = [];
    }
    nicheGroups[project.niche].push(project);
  }

  return (
    <section className="relative z-[5] overflow-hidden px-10 pt-32 pb-24">
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
        {Object.entries(nicheGroups).map(([niche, projects]) => (
          <div key={niche} className="mb-16 last:mb-0">
            <motion.div
              className="mb-6 flex items-center gap-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="h-4 w-px bg-foreground" />
              <h3 className="font-mono text-[10px] uppercase tracking-[2px] text-muted">
                {niche}
              </h3>
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
