"use client";

import * as motion from "motion/react-client";

export default function Stats({
  dict,
}: {
  dict: {
    label: string;
    items: { value: string; label: string }[];
  };
}) {
  return (
    <section className="relative z-[5] overflow-hidden py-24 px-10">
      <div className="mb-12">
        <span className="font-mono text-[9px] uppercase tracking-[2px] text-muted">
          {dict.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-px md:grid-cols-4">
        {dict.items.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="border border-muted/20 p-8 text-center md:p-12"
          >
            <div
              className="font-sans font-extralight tracking-[-2px]"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              {item.value}
            </div>
            <div className="mt-3 font-mono text-[9px] uppercase tracking-[2px] text-muted">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
