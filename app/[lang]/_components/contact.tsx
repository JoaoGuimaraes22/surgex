"use client";

import * as motion from "motion/react-client";
import { useState } from "react";

export default function Contact({
  dict,
}: {
  dict: {
    label: string;
    headline: string;
    description: string;
    fields: {
      name: string;
      email: string;
      message: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
    };
    cta: string;
    info: {
      email: string;
      location: string;
      status: string;
    };
  };
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xwvwlvok", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative z-[5] overflow-hidden py-32 px-10">
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

      <div className="grid gap-16 md:grid-cols-2">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="mb-2 block font-mono text-[9px] uppercase tracking-[2px] text-muted">
              {dict.fields.name}
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder={dict.fields.namePlaceholder}
              className="w-full border-b border-muted/30 bg-transparent px-0 py-3 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted/50 focus:border-foreground"
            />
          </div>

          <div>
            <label className="mb-2 block font-mono text-[9px] uppercase tracking-[2px] text-muted">
              {dict.fields.email}
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder={dict.fields.emailPlaceholder}
              className="w-full border-b border-muted/30 bg-transparent px-0 py-3 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted/50 focus:border-foreground"
            />
          </div>

          <div>
            <label className="mb-2 block font-mono text-[9px] uppercase tracking-[2px] text-muted">
              {dict.fields.message}
            </label>
            <textarea
              name="message"
              rows={4}
              required
              placeholder={dict.fields.messagePlaceholder}
              className="w-full resize-none border-b border-muted/30 bg-transparent px-0 py-3 text-sm text-foreground outline-none transition-colors duration-300 placeholder:text-muted/50 focus:border-foreground"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="group mt-4 inline-flex w-fit items-center gap-5 transition-transform duration-300 ease-out hover:translate-x-[10px] disabled:opacity-50"
          >
            <span className="text-xs uppercase tracking-[3px]">
              {status === "sending" ? "TRANSMITTING..." : status === "sent" ? "TRANSMITTED ✓" : dict.cta}
            </span>
            <div className="h-px w-[60px] bg-foreground transition-all duration-300 group-hover:w-[100px]" />
          </button>

          {status === "error" && (
            <p className="font-mono text-[9px] uppercase tracking-[2px] text-red-500">
              TRANSMISSION_FAILED — TRY AGAIN
            </p>
          )}
        </motion.form>

        {/* Info panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-between"
        >
          <div className="flex flex-col gap-8">
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {dict.description}
            </p>

            <div className="flex flex-col gap-4">
              <div>
                <span className="font-mono text-[8px] uppercase tracking-[2px] text-muted">
                  EMAIL
                </span>
                <p className="mt-1 text-sm">{dict.info.email}</p>
              </div>
              <div>
                <span className="font-mono text-[8px] uppercase tracking-[2px] text-muted">
                  LOCATION
                </span>
                <p className="mt-1 text-sm">{dict.info.location}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 border border-muted/20 p-6">
            <span className="font-mono text-[8px] uppercase tracking-[2px] text-muted">
              SYSTEM_STATUS:
            </span>
            <span className="ml-2 font-mono text-[8px] uppercase tracking-[2px] text-foreground">
              {dict.info.status}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
