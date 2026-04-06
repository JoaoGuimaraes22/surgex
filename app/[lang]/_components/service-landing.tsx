"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import Faq from "./faq";

/* ---------- reusable sub-components ---------- */

function CornerAccent({
  corner,
  active,
}: {
  corner: string;
  active: boolean;
}) {
  return (
    <div
      className={`absolute ${corner} h-8 w-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${active ? "opacity-100 md:opacity-0 md:group-hover:opacity-100" : ""}`}
    >
      <div className={`absolute ${corner} h-full w-px bg-foreground`} />
      <div className={`absolute ${corner} h-px w-full bg-foreground`} />
    </div>
  );
}

function SectionHeader({
  label,
  headline,
}: {
  label: string;
  headline: string;
}) {
  return (
    <div className="mb-16">
      <span className="font-mono text-[9px] uppercase tracking-[2px] text-muted">
        {label}
      </span>
      <h2
        className="mt-4 font-sans font-extralight leading-[0.9] tracking-[-1px]"
        style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
      >
        {headline}
      </h2>
    </div>
  );
}

/* ---------- section components ---------- */

function HeroSection({
  tag,
  hero,
}: {
  tag: string;
  hero: { title: string; subtitle: string; valueProp: string };
}) {
  return (
    <section className="relative z-[5] overflow-hidden px-10 pt-32 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <span className="font-mono text-[10px] tracking-[2px] text-muted">
          ({tag})
        </span>
        <h1
          className="mt-6 font-sans font-extralight leading-[0.9] tracking-[-1px]"
          style={{ fontSize: "clamp(32px, 6vw, 64px)" }}
        >
          {hero.title}
        </h1>
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[2px] text-muted">
          {hero.subtitle}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          {hero.valueProp}
        </p>
      </motion.div>
    </section>
  );
}

function DescriptionSection({
  data,
}: {
  data: {
    label: string;
    headline: string;
    text: string;
    highlights: { title: string; text: string }[];
  };
}) {
  const corners = [
    "top-0 left-0",
    "top-0 right-0",
    "bottom-0 left-0",
    "bottom-0 right-0",
  ];

  return (
    <section className="relative z-[5] overflow-hidden py-32 px-10">
      <SectionHeader label={data.label} headline={data.headline} />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mb-16 max-w-3xl text-sm leading-relaxed text-muted"
      >
        {data.text}
      </motion.p>
      <div className="grid gap-px md:grid-cols-2">
        {data.highlights.map((h, i) => (
          <motion.div
            key={h.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative border border-muted/20 p-8"
          >
            <h3 className="text-base font-light">{h.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{h.text}</p>
            <CornerAccent corner={corners[i % 4]} active={false} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function UseCasesSection({
  data,
}: {
  data: {
    label: string;
    headline: string;
    items: { tag: string; title: string; text: string }[];
  };
}) {
  const corners = [
    "top-0 left-0",
    "top-0 right-0",
    "bottom-0 left-0",
    "bottom-0 right-0",
  ];

  return (
    <section className="relative z-[5] overflow-hidden py-32 px-10">
      <SectionHeader label={data.label} headline={data.headline} />
      <div className="grid gap-px md:grid-cols-2">
        {data.items.map((item, i) => {
          const corner = corners[i % 4];
          return (
            <UseCaseCard key={item.tag} item={item} i={i} corner={corner} />
          );
        })}
      </div>
    </section>
  );
}

function UseCaseCard({
  item,
  i,
  corner,
}: {
  item: { tag: string; title: string; text: string };
  i: number;
  corner: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      className={`group relative border border-muted/20 p-10 ${inView ? "is-active" : ""}`}
    >
      <span className="font-mono text-[10px] tracking-[2px] text-muted">
        ({item.tag})
      </span>
      <h3 className="mt-6 text-xl font-light tracking-[-0.5px]">
        {item.title}
      </h3>
      <div className="my-6 h-px w-12 bg-muted transition-all duration-500 group-hover:w-full group-hover:bg-foreground group-[.is-active]:w-full group-[.is-active]:bg-foreground md:group-[.is-active]:w-12 md:group-[.is-active]:bg-muted md:group-hover:w-full md:group-hover:bg-foreground" />
      <p className="text-sm leading-relaxed text-muted">{item.text}</p>
      <div
        className={`absolute ${corner} h-8 w-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-[.is-active]:opacity-100 md:group-[.is-active]:opacity-0 md:group-hover:opacity-100`}
      >
        <div className={`absolute ${corner} h-full w-px bg-foreground`} />
        <div className={`absolute ${corner} h-px w-full bg-foreground`} />
      </div>
    </motion.div>
  );
}

function ProcessSection({
  data,
}: {
  data: {
    label: string;
    headline: string;
    steps: { tag: string; title: string; description: string; status: string }[];
  };
}) {
  const corners = [
    "top-0 left-0",
    "top-0 right-0",
    "bottom-0 left-0",
    "bottom-0 right-0",
  ];

  return (
    <section className="relative z-[5] overflow-hidden py-32 px-10">
      <SectionHeader label={data.label} headline={data.headline} />
      <div className="grid gap-px md:grid-cols-2">
        {data.steps.map((step, i) => {
          const corner = corners[i % 4];
          return (
            <ProcessStepCard key={step.tag} step={step} i={i} corner={corner} />
          );
        })}
      </div>
    </section>
  );
}

function ProcessStepCard({
  step,
  i,
  corner,
}: {
  step: { tag: string; title: string; description: string; status: string };
  i: number;
  corner: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

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
      <p className="text-sm leading-relaxed text-muted">{step.description}</p>
      <div
        className={`absolute ${corner} h-8 w-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-[.is-active]:opacity-100 md:group-[.is-active]:opacity-0 md:group-hover:opacity-100`}
      >
        <div className={`absolute ${corner} h-full w-px bg-foreground`} />
        <div className={`absolute ${corner} h-px w-full bg-foreground`} />
      </div>
    </motion.div>
  );
}

function BenefitsSection({
  data,
}: {
  data: {
    label: string;
    headline: string;
    items: { title: string; text: string }[];
  };
}) {
  const corners = [
    "top-0 left-0",
    "top-0 right-0",
    "bottom-0 left-0",
    "bottom-0 right-0",
  ];

  return (
    <section className="relative z-[5] overflow-hidden py-32 px-10">
      <SectionHeader label={data.label} headline={data.headline} />
      <div className="grid gap-px md:grid-cols-2">
        {data.items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative border border-muted/20 p-8"
          >
            <h3 className="text-base font-light">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {item.text}
            </p>
            <CornerAccent corner={corners[i % 4]} active={false} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CtaSection({
  data,
  lang,
}: {
  data: {
    headline: string;
    text: string;
    buttonLabel: string;
    buttonHref: string;
  };
  lang: string;
}) {
  const href = data.buttonHref.startsWith("#")
    ? `/${lang}${data.buttonHref}`
    : data.buttonHref;

  return (
    <section className="relative z-[5] overflow-hidden py-32 px-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-2xl text-center"
      >
        <h2
          className="font-sans font-extralight leading-[0.9] tracking-[-1px]"
          style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
        >
          {data.headline}
        </h2>
        <p className="mt-6 text-sm leading-relaxed text-muted">{data.text}</p>
        <Link
          href={href}
          className="mt-10 inline-block border border-foreground px-8 py-3 font-mono text-xs uppercase tracking-[2px] transition-colors duration-300 hover:bg-foreground hover:text-background"
        >
          {data.buttonLabel}
        </Link>
      </motion.div>
    </section>
  );
}

/* ---------- main component ---------- */

export default function ServiceLanding({
  service,
  lang,
}: {
  service: {
    tag: string;
    title: string;
    hero: { title: string; subtitle: string; valueProp: string };
    description: {
      label: string;
      headline: string;
      text: string;
      highlights: { title: string; text: string }[];
    };
    useCases: {
      label: string;
      headline: string;
      items: { tag: string; title: string; text: string }[];
    };
    process: {
      label: string;
      headline: string;
      steps: {
        tag: string;
        title: string;
        description: string;
        status: string;
      }[];
    };
    benefits: {
      label: string;
      headline: string;
      items: { title: string; text: string }[];
    };
    faq: {
      label: string;
      headline: string;
      items: { question: string; answer: string }[];
    };
    cta: {
      headline: string;
      text: string;
      buttonLabel: string;
      buttonHref: string;
    };
  };
  lang: string;
}) {
  return (
    <>
      <HeroSection tag={service.tag} hero={service.hero} />
      <DescriptionSection data={service.description} />
      <UseCasesSection data={service.useCases} />
      <ProcessSection data={service.process} />
      <BenefitsSection data={service.benefits} />
      <Faq dict={service.faq} />
      <CtaSection data={service.cta} lang={lang} />
    </>
  );
}
