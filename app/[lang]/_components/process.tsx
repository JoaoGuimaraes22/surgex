"use client";

import * as motion from "motion/react-client";

export default function Process({
  dict,
}: {
  dict: {
    label: string;
    headline: string;
    steps: {
      tag: string;
      title: string;
      description: string;
      status: string;
    }[];
  };
}) {
  return (
    <section id="process" className="relative z-[5] overflow-hidden bg-background py-32 px-10">
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

      {/* Steps grid */}
      <div className="grid gap-px md:grid-cols-2" style={{ background: "var(--muted)" }}>
        {dict.steps.map((step, i) => (
          <motion.div
            key={step.tag}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative bg-background p-10"
          >
            {/* Tag + status row */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-[2px] text-muted">
                ({step.tag})
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[2px] text-muted">
                STATUS: <span className="text-foreground">{step.status}</span>
              </span>
            </div>

            <h3 className="mt-6 text-2xl font-light tracking-[-0.5px] md:text-3xl">
              {step.title}
            </h3>

            {/* Divider */}
            <div className="my-5 h-px w-12 bg-muted transition-all duration-500 group-hover:w-full group-hover:bg-foreground" />

            <p className="text-sm leading-relaxed text-muted">
              {step.description}
            </p>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 h-8 w-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute top-0 right-0 h-full w-px bg-foreground" />
              <div className="absolute top-0 right-0 h-px w-full bg-foreground" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
