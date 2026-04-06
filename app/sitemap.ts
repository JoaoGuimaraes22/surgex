import type { MetadataRoute } from "next";
import { i18n } from "@/i18n-config";
import enDict from "./[lang]/dictionaries/en.json";
import { getAllSlugs } from "./[lang]/_lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const pages = ["", "/projects", "/services"];
  const projectIds = enDict.portfolio.projects.map((p) => p.id);

  const staticPages = pages.flatMap((page) =>
    i18n.locales.map((lang) => ({
      url: `${siteUrl}/${lang}${page}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((l) => [l, `${siteUrl}/${l}${page}`])
        ),
      },
    }))
  );

  const projectPages = projectIds.flatMap((id) =>
    i18n.locales.map((lang) => ({
      url: `${siteUrl}/${lang}/projects/${id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((l) => [l, `${siteUrl}/${l}/projects/${id}`])
        ),
      },
    }))
  );

  const blogListingPages = i18n.locales.map((lang) => ({
    url: `${siteUrl}/${lang}/blog`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    alternates: {
      languages: Object.fromEntries(
        i18n.locales.map((l) => [l, `${siteUrl}/${l}/blog`])
      ),
    },
  }));

  const blogSlugs = [
    ...new Set([...getAllSlugs("en"), ...getAllSlugs("pt")]),
  ];
  const blogPostPages = blogSlugs.flatMap((slug) =>
    i18n.locales.map((lang) => ({
      url: `${siteUrl}/${lang}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((l) => [l, `${siteUrl}/${l}/blog/${slug}`])
        ),
      },
    }))
  );

  const serviceSlugs = ["ai-solutions", "websites", "automation", "marketing", "geo-aeo", "training"];
  const servicePages = serviceSlugs.flatMap((slug) =>
    i18n.locales.map((lang) => ({
      url: `${siteUrl}/${lang}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((l) => [l, `${siteUrl}/${l}/services/${slug}`])
        ),
      },
    }))
  );

  return [...staticPages, ...projectPages, ...blogListingPages, ...blogPostPages, ...servicePages];
}
