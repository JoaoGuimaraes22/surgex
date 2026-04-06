"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

function FaqItem({
  item,
  i,
  isOpen,
  onToggle,
}: {
  item: { question: string; answer: string };
  i: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      className="group border-b border-muted/20"
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-7 text-left transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-[2px] text-muted">
            ({String(i + 1).padStart(2, "0")})
          </span>
          <h3 className="text-sm font-light tracking-[-0.3px] md:text-base">
            {item.question}
          </h3>
        </div>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center border text-xs transition-all duration-300 ${
            isOpen
              ? "border-foreground/40 rotate-45"
              : "border-muted/30 rotate-0"
          }`}
        >
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-7 pl-[52px] text-sm leading-relaxed text-muted md:pl-[56px]">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Faq({
  dict,
}: {
  dict: {
    label: string;
    headline: string;
    items: { question: string; answer: string }[];
  };
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative z-[5] overflow-hidden py-32 px-10">
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

      <div className="mx-auto max-w-3xl border-t border-muted/20">
        {dict.items.map((item, i) => (
          <FaqItem
            key={i}
            item={item}
            i={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </section>
  );
}
