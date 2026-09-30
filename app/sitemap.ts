import type { MetadataRoute } from "next";
import { i18n } from "@/i18n-config";
import { getAllPosts } from "./[lang]/_lib/blog";
import { SITE_URL } from "./[lang]/_lib/seo";

// Project detail pages are noindex (thin demo pages), so they stay out.
// lastModified only where it is true (blog post dates): a "now" on every URL
// teaches Google to ignore the field.
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = SITE_URL;

  const pages = ["", "/about", "/projects", "/services"];

  const staticPages = pages.flatMap((page) =>
    i18n.locales.map((lang) => ({
      url: `${siteUrl}/${lang}${page}`,
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((l) => [l, `${siteUrl}/${l}${page}`])
        ),
      },
    }))
  );

  const blogListingPages = i18n.locales.map((lang) => ({
    url: `${siteUrl}/${lang}/blog`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    alternates: {
      languages: Object.fromEntries(
        i18n.locales.map((l) => [l, `${siteUrl}/${l}/blog`])
      ),
    },
  }));

  // A post exists under its own locale only; the other locale's URL is its
  // `alternateSlug` (listing every slug under both locales sent Google to 26 soft-404s).
  const blogPostPages = i18n.locales.flatMap((lang) =>
    getAllPosts(lang).map((post) => {
      const other = i18n.locales.find((l) => l !== lang) ?? lang;
      return {
        url: `${siteUrl}/${lang}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: {
            [lang]: `${siteUrl}/${lang}/blog/${post.slug}`,
            [other]: `${siteUrl}/${other}/blog/${post.alternateSlug ?? post.slug}`,
          },
        },
      };
    })
  );

  const serviceSlugs = ["online-presence", "get-found", "customer-care", "social-media", "campaigns"];
  const servicePages = serviceSlugs.flatMap((slug) =>
    i18n.locales.map((lang) => ({
      url: `${siteUrl}/${lang}/services/${slug}`,
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
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          i18n.locales.map((l) => [l, `${siteUrl}/${l}/cities/${slug}`])
        ),
      },
    }))
  );

  return [...staticPages, ...blogListingPages, ...blogPostPages, ...servicePages, ...cityPages];
}
