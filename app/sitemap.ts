import type { MetadataRoute } from "next";
import { i18n } from "@/i18n-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return i18n.locales.map((lang) => ({
    url: `${siteUrl}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        i18n.locales.map((l) => [l, `${siteUrl}/${l}`])
      ),
    },
  }));
}
