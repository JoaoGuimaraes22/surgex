export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.surgex.pt";

type LabelKey = "home" | "blog" | "services" | "about";

const BREADCRUMB_LABELS: Record<string, Record<LabelKey, string>> = {
  en: { home: "Home", blog: "Blog", services: "Services", about: "About" },
  pt: { home: "Início", blog: "Blog", services: "Serviços", about: "Sobre" },
};

export function bcp47Locale(lang: string): string {
  return lang === "pt" ? "pt-PT" : "en";
}

export function ogLocale(lang: string): string {
  return lang === "pt" ? "pt_PT" : "en_US";
}

export function breadcrumbLabel(lang: string, key: LabelKey): string {
  return (BREADCRUMB_LABELS[lang] ?? BREADCRUMB_LABELS.en)[key];
}

export function schemaIds(lang: string) {
  const base = `${SITE_URL}/${lang}`;
  return {
    website: `${base}#website`,
    business: `${base}#business`,
    founder: `${base}#founder`,
  };
}

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildBreadcrumb(lang: string, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: breadcrumbLabel(lang, "home"),
        item: `${SITE_URL}/${lang}`,
      },
      ...items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: it.name,
        item: `${SITE_URL}/${lang}${it.path}`,
      })),
    ],
  };
}
