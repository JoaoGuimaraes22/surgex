import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogPostMeta = {
  slug: string;
  alternateSlug?: string;
  title: string;
  description: string;
  date: string;
  category: string;
  locale: string;
  image?: string;
  readingTime: number;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPosts(locale: string): BlogPostMeta[] {
  const dir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data } = matter(raw);
      return {
        slug: data.slug as string,
        alternateSlug: data.alternateSlug as string | undefined,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        category: data.category as string,
        locale: data.locale as string,
        image: data.image as string | undefined,
        readingTime: (data.readingTime as number) ?? 5,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(
  locale: string,
  slug: string
): BlogPost | null {
  const dir = path.join(BLOG_DIR, locale);
  if (!fs.existsSync(dir)) return null;

  for (const filename of fs.readdirSync(dir)) {
    if (!filename.endsWith(".mdx")) continue;
    const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
    const { data, content } = matter(raw);
    if (data.slug === slug) {
      return {
        slug: data.slug as string,
        alternateSlug: data.alternateSlug as string | undefined,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        category: data.category as string,
        locale: data.locale as string,
        image: data.image as string | undefined,
        readingTime: (data.readingTime as number) ?? 5,
        content,
      };
    }
  }
  return null;
}

export function getAllSlugs(locale: string): string[] {
  return getAllPosts(locale).map((p) => p.slug);
}
