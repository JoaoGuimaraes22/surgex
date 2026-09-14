import type { MetadataRoute } from "next";
import { i18n } from "@/i18n-config";
import enDict from "./[lang]/dictionaries/en.json";
import { getAllSlugs } from "./[lang]/_lib/blog";
import { SITE_URL } from "./[lang]/_lib/seo";
import { visibleProjects } from "./[lang]/_lib/hidden-projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = SITE_URL;

  const pages = ["", "/about", "/projects", "/services"];
  const projectIds = visibleProjects(enDict.portfolio.projects).map((p) => p.id);

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

  const serviceSlugs = ["online-presence", "get-found", "customer-care", "social-media", "campaigns"];
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

  const citySlugs = ["carcavelos"];
  const cityPages = citySlugs.flatMap((slug) =>
    i18n.locales.map((lang) => ({
      url: `${siteUrl}/${lang}/cities/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((l) => [l, `${siteUrl}/${l}/cities/${slug}`])
        ),
      },
    }))
  );

  return [...staticPages, ...projectPages, ...blogListingPages, ...blogPostPages, ...servicePages, ...cityPages];
}
