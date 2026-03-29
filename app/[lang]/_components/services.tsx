"use client";

import * as motion from "motion/react-client";

export default function Services({
  dict,
}: {
  dict: {
    label: string;
    headline: string;
    items: {
      id: string;
      tag: string;
      title: string;
      description: string;
      features: string[];
    }[];
  };
}) {
  return (
    <section id="services" className="relative overflow-hidden bg-background py-32 px-10">
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

      {/* Service cards */}
      <div className="grid gap-px md:grid-cols-3" style={{ background: "var(--muted)" }}>
        {dict.items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="group relative bg-background p-10"
          >
            {/* Tag number */}
            <span className="font-mono text-[10px] tracking-[2px] text-muted">
              ({item.tag})
            </span>

            {/* Title */}
            <h3 className="mt-6 text-xl font-light tracking-[-0.5px]">
              {item.title}
            </h3>

            {/* Divider */}
            <div className="my-6 h-px w-12 bg-muted transition-all duration-500 group-hover:w-full group-hover:bg-foreground" />

            {/* Description */}
            <p className="text-sm leading-relaxed text-muted">
              {item.description}
            </p>

            {/* Features */}
            <ul className="mt-8 flex flex-wrap gap-2">
              {item.features.map((f) => (
                <li
                  key={f}
                  className="border border-muted/30 px-3 py-1 font-mono text-[9px] uppercase tracking-[1px] text-muted transition-colors duration-300 group-hover:border-foreground/20 group-hover:text-foreground"
                >
                  {f}
                </li>
              ))}
            </ul>

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
