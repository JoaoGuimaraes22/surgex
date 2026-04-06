"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function BlogCard({
  post,
  lang,
  readMore,
  index,
}: {
  post: {
    slug: string;
    title: string;
    description: string;
    date: string;
    category: string;
    readingTime: number;
    image?: string;
  };
  lang: string;
  readMore: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        href={`/${lang}/blog/${post.slug}`}
        className="group relative flex h-full flex-col border border-muted/20 bg-muted/5 p-6 transition-colors duration-300 hover:bg-muted/10"
      >
        {/* Corner accent on hover */}
        <div className="absolute top-4 right-4 h-6 w-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute top-0 right-0 h-full w-px bg-foreground" />
          <div className="absolute top-0 right-0 h-px w-full bg-foreground" />
        </div>

        {/* Category */}
        <span className="font-mono text-[9px] uppercase tracking-[2px] text-muted">
          {post.category}
        </span>

        {/* Title */}
        <h3 className="mt-3 text-lg font-light tracking-[-0.5px]">
          {post.title}
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
          {post.description}
        </p>

        {/* Spacer to push bottom content down */}
        <div className="mt-auto" />

        {/* Date + Reading time */}
        <div className="mt-6 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[2px] text-muted/60">
          <time dateTime={post.date}>{post.date}</time>
          <span>·</span>
          <span>{post.readingTime} min</span>
        </div>

        {/* CTA line */}
        <div className="mt-4 flex items-center gap-3 opacity-0 transition-all duration-300 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="font-mono text-[10px] uppercase tracking-[2px] text-muted">
            {readMore}
          </span>
          <div className="h-px w-8 bg-foreground transition-all duration-300 group-hover:w-16" />
        </div>
      </Link>
    </motion.div>
  );
}
