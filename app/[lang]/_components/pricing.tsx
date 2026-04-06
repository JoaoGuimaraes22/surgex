"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

function PricingCard({
  plan,
  i,
}: {
  plan: {
    id: string;
    tag: string;
    title: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    status: string;
  };
  i: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const isRecommended = plan.status === "RECOMMENDED";

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
      className={`group relative border p-10 ${inView ? "is-active" : ""} ${
        isRecommended
          ? "border-foreground/40"
          : "border-muted/20"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[2px] text-muted">
          ({plan.tag})
        </span>
        <span className="font-mono text-[8px] uppercase tracking-[2px] text-muted">
          STATUS:{" "}
          <span className={isRecommended ? "text-foreground" : "text-foreground"}>
            {plan.status}
          </span>
        </span>
      </div>

      <h3 className="mt-6 text-xl font-light tracking-[-0.5px]">
        {plan.title}
      </h3>

      {/* Price */}
      <div className="mt-4 flex items-baseline gap-2">
        <span
          className="font-sans font-extralight tracking-[-1px]"
          style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
        >
          {plan.price}
        </span>
        <span className="font-mono text-[10px] tracking-[1px] text-muted">
          {plan.period}
        </span>
      </div>

      <div className="my-6 h-px w-12 bg-muted transition-all duration-500 group-hover:w-full group-hover:bg-foreground group-[.is-active]:w-full group-[.is-active]:bg-foreground md:group-[.is-active]:w-12 md:group-[.is-active]:bg-muted md:group-hover:w-full md:group-hover:bg-foreground" />

      <p className="text-sm leading-relaxed text-muted">
        {plan.description}
      </p>

      <ul className="mt-8 flex flex-wrap gap-2">
        {plan.features.map((f) => (
          <li
            key={f}
            className="border border-muted/30 px-3 py-1 font-mono text-[9px] uppercase tracking-[1px] text-muted transition-colors duration-300 group-hover:border-foreground/20 group-hover:text-foreground group-[.is-active]:border-foreground/20 group-[.is-active]:text-foreground md:group-[.is-active]:border-muted/30 md:group-[.is-active]:text-muted md:group-hover:border-foreground/20 md:group-hover:text-foreground"
          >
            {f}
          </li>
        ))}
      </ul>

      {/* Corner accent */}
      <div
        className={`absolute ${corner} h-8 w-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-[.is-active]:opacity-100 md:group-[.is-active]:opacity-0 md:group-hover:opacity-100`}
      >
        <div className={`absolute ${corner} h-full w-px bg-foreground`} />
        <div className={`absolute ${corner} h-px w-full bg-foreground`} />
      </div>
    </motion.div>
  );
}

export default function Pricing({
  dict,
}: {
  dict: {
    label: string;
    headline: string;
    description: string;
    plans: {
      id: string;
      tag: string;
      title: string;
      price: string;
      period: string;
      description: string;
      features: string[];
      status: string;
    }[];
    cta: string;
    note: string;
  };
}) {
  return (
    <section id="pricing" className="relative z-[5] overflow-hidden py-32 px-10">
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
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
          {dict.description}
        </p>
      </div>

      <div className="grid gap-px md:grid-cols-2">
        {dict.plans.map((plan, i) => (
          <PricingCard key={plan.id} plan={plan} i={i} />
        ))}
      </div>

      {/* Note + CTA */}
      <div className="mt-16 flex flex-col items-center gap-8">
        <p className="max-w-lg text-center font-mono text-[10px] leading-relaxed tracking-[1px] text-muted">
          {dict.note}
        </p>
        <a
          href="#contact"
          className="group inline-flex items-center gap-5 transition-transform duration-300 ease-out hover:translate-x-[10px]"
        >
          <span className="text-xs uppercase tracking-[3px] text-muted transition-colors duration-300 group-hover:text-foreground">
            {dict.cta}
          </span>
          <div className="h-px w-[60px] bg-foreground transition-all duration-300 group-hover:w-[100px]" />
        </a>
      </div>
    </section>
  );
}
