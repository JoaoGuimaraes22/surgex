import type { MetadataRoute } from "next";
import { i18n } from "@/i18n-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const pages = ["", "/projects"];

  return pages.flatMap((page) =>
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
}
