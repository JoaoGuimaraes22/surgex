"use client";

import * as motion from "motion/react-client";

export default function Portfolio({
  dict,
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
    }[];
    cta: string;
  };
}) {
  return (
    <section id="work" className="relative z-[5] overflow-hidden bg-background py-32 px-10">
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

      {/* Project grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dict.projects.map((project, i) => (
          <motion.a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
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
              </span>
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
          </motion.a>
        ))}
      </div>
    </section>
  );
}
