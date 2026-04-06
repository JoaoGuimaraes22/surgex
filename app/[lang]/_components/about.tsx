"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

export default function About({
  dict,
}: {
  dict: {
    label: string;
    headline: string;
    founder: {
      name: string;
      role: string;
      description: string;
      status: string;
    };
    network: {
      label: string;
      description: string;
      tags: string[];
    };
    philosophy: {
      label: string;
      text: string;
    };
  };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section id="about" className="relative z-[5] overflow-hidden py-32 px-10">
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

      <div ref={ref} className="grid gap-px md:grid-cols-2">
        {/* Founder card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className={`group relative border border-muted/20 p-10 ${inView ? "is-active" : ""}`}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[2px] text-muted">
              (01)
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[2px] text-muted">
              STATUS: <span className="text-foreground">{dict.founder.status}</span>
            </span>
          </div>

          <h3 className="mt-6 text-2xl font-light tracking-[-0.5px] md:text-3xl">
            {dict.founder.name}
          </h3>

          <span className="mt-2 block font-mono text-[10px] uppercase tracking-[2px] text-muted">
            {dict.founder.role}
          </span>

          <div className="my-5 h-px w-12 bg-muted transition-all duration-500 group-hover:w-full group-hover:bg-foreground group-[.is-active]:w-full group-[.is-active]:bg-foreground md:group-[.is-active]:w-12 md:group-[.is-active]:bg-muted md:group-hover:w-full md:group-hover:bg-foreground" />

          <p className="text-sm leading-relaxed text-muted">
            {dict.founder.description}
          </p>

          {/* Corner accent — top-left */}
          <div className="absolute top-0 left-0 h-8 w-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-[.is-active]:opacity-100 md:group-[.is-active]:opacity-0 md:group-hover:opacity-100">
            <div className="absolute top-0 left-0 h-full w-px bg-foreground" />
            <div className="absolute top-0 left-0 h-px w-full bg-foreground" />
          </div>
        </motion.div>

        {/* Right column — network + philosophy */}
        <div className="flex flex-col gap-px">
          {/* Network */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="group relative border border-muted/20 p-10"
          >
            <span className="font-mono text-[10px] tracking-[2px] text-muted">
              (02)
            </span>

            <h3 className="mt-6 text-xl font-light tracking-[-0.5px]">
              {dict.network.label}
            </h3>

            <div className="my-5 h-px w-12 bg-muted transition-all duration-500 group-hover:w-full group-hover:bg-foreground" />

            <p className="text-sm leading-relaxed text-muted">
              {dict.network.description}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {dict.network.tags.map((tag) => (
                <li
                  key={tag}
                  className="border border-muted/30 px-3 py-1 font-mono text-[9px] uppercase tracking-[1px] text-muted transition-colors duration-300 group-hover:border-foreground/20 group-hover:text-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>

            {/* Corner accent — top-right */}
            <div className="absolute top-0 right-0 h-8 w-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute top-0 right-0 h-full w-px bg-foreground" />
              <div className="absolute top-0 right-0 h-px w-full bg-foreground" />
            </div>
          </motion.div>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative flex flex-1 flex-col justify-center border border-muted/20 p-10"
          >
            <span className="font-mono text-[10px] tracking-[2px] text-muted">
              (03)
            </span>

            <h3 className="mt-6 text-xl font-light tracking-[-0.5px]">
              {dict.philosophy.label}
            </h3>

            <div className="my-5 h-px w-12 bg-muted transition-all duration-500 group-hover:w-full group-hover:bg-foreground" />

            <p className="text-sm italic leading-relaxed text-muted">
              &ldquo;{dict.philosophy.text}&rdquo;
            </p>

            {/* Corner accent — bottom-right */}
            <div className="absolute bottom-0 right-0 h-8 w-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute bottom-0 right-0 h-full w-px bg-foreground" />
              <div className="absolute bottom-0 right-0 h-px w-full bg-foreground" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
