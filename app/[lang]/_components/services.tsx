"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

function ServiceCard({
  item,
  i,
}: {
  item: {
    id: string;
    tag: string;
    title: string;
    description: string;
    features: string[];
  };
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  const corners = [
    "top-0 left-0",
    "top-0 right-0",
    "bottom-0 left-0",
    "bottom-0 right-0",
  ];
  const corner = corners[i % 4];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: i * 0.15 }}
      className={`group relative border border-muted/20 p-10 ${inView ? "is-active" : ""}`}
    >
      <span className="font-mono text-[10px] tracking-[2px] text-muted">
        ({item.tag})
      </span>

      <h3 className="mt-6 text-xl font-light tracking-[-0.5px]">
        {item.title}
      </h3>

      <div className="my-6 h-px w-12 bg-muted transition-all duration-500 group-hover:w-full group-hover:bg-foreground group-[.is-active]:w-full group-[.is-active]:bg-foreground md:group-[.is-active]:w-12 md:group-[.is-active]:bg-muted md:group-hover:w-full md:group-hover:bg-foreground" />

      <p className="text-sm leading-relaxed text-muted">
        {item.description}
      </p>

      <ul className="mt-8 flex flex-wrap gap-2">
        {item.features.map((f) => (
          <li
            key={f}
            className="border border-muted/30 px-3 py-1 font-mono text-[9px] uppercase tracking-[1px] text-muted transition-colors duration-300 group-hover:border-foreground/20 group-hover:text-foreground group-[.is-active]:border-foreground/20 group-[.is-active]:text-foreground md:group-[.is-active]:border-muted/30 md:group-[.is-active]:text-muted md:group-hover:border-foreground/20 md:group-hover:text-foreground"
          >
            {f}
          </li>
        ))}
      </ul>

      <div className={`absolute ${corner} h-8 w-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-[.is-active]:opacity-100 md:group-[.is-active]:opacity-0 md:group-hover:opacity-100`}>
        <div className={`absolute ${corner} h-full w-px bg-foreground`} />
        <div className={`absolute ${corner} h-px w-full bg-foreground`} />
      </div>
    </motion.div>
  );
}

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
    <section id="services" className="relative z-[5] overflow-hidden py-32 px-10">
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

      <div className="grid gap-px md:grid-cols-2">
        {dict.items.map((item, i) => (
          <ServiceCard key={item.id} item={item} i={i} />
        ))}
      </div>
    </section>
  );
}
