"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

function ProcessCard({
  step,
  i,
}: {
  step: {
    tag: string;
    title: string;
    description: string;
    status: string;
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      className={`group relative border border-muted/20 p-10 ${inView ? "is-active" : ""}`}
    >
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

      <div className="my-5 h-px w-12 bg-muted transition-all duration-500 group-hover:w-full group-hover:bg-foreground group-[.is-active]:w-full group-[.is-active]:bg-foreground md:group-[.is-active]:w-12 md:group-[.is-active]:bg-muted md:group-hover:w-full md:group-hover:bg-foreground" />

      <p className="text-sm leading-relaxed text-muted">
        {step.description}
      </p>

      <div className={`absolute ${corner} h-8 w-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-[.is-active]:opacity-100 md:group-[.is-active]:opacity-0 md:group-hover:opacity-100`}>
        <div className={`absolute ${corner} h-full w-px bg-foreground`} />
        <div className={`absolute ${corner} h-px w-full bg-foreground`} />
      </div>
    </motion.div>
  );
}

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
    <section id="process" className="relative z-[5] overflow-hidden py-32 px-10">
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
        {dict.steps.map((step, i) => (
          <ProcessCard key={step.tag} step={step} i={i} />
        ))}
      </div>
    </section>
  );
}
