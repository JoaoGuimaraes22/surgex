import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import ThemeProvider from "../_components/theme-provider";
import BackgroundSphere from "../_components/background-sphere";
import Navbar from "../_components/navbar";
import Footer from "../_components/footer";
import ChatWidget from "../_components/chat-widget";
import WhatsappButton from "../_components/whatsapp-button";
import About from "../_components/about";
import AboutPageExtras from "../_components/about-page-extras";
import JsonLd from "../_components/json-ld";
import {
  SITE_URL,
  bcp47Locale,
  ogLocale,
  schemaIds,
  buildBreadcrumb,
  breadcrumbLabel,
} from "../_lib/seo";

const FOUNDER_LINKEDIN =
  "https://www.linkedin.com/in/jo%C3%A3o-sebasti%C3%A3o-guimar%C3%A3es-4abaa7197/";
const FOUNDING_DATE = "2026";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);

  const otherLang = lang === "pt" ? "en" : "pt";

  return {
    title: dict.aboutPage.meta.title,
    description: dict.aboutPage.meta.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/about`,
      languages: {
        [lang]: `${SITE_URL}/${lang}/about`,
        [otherLang]: `${SITE_URL}/${otherLang}/about`,
      },
    },
    openGraph: {
      title: dict.aboutPage.meta.title,
      description: dict.aboutPage.meta.description,
      url: `${SITE_URL}/${lang}/about`,
      type: "website",
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
      locale: ogLocale(lang),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.aboutPage.meta.title,
      description: dict.aboutPage.meta.description,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  const ids = schemaIds(lang);
  const aboutPageId = `${SITE_URL}/${lang}/about#aboutpage`;
  const breadcrumbId = `${SITE_URL}/${lang}/about#breadcrumb`;

  const otherLang = lang === "pt" ? "en" : "pt";
  const localeAlternates = {
    [lang]: `/${lang}/about`,
    [otherLang]: `/${otherLang}/about`,
  };

  const breadcrumb = {
    ...buildBreadcrumb(lang, [
      { name: breadcrumbLabel(lang, "about"), path: "/about" },
    ]),
    "@id": breadcrumbId,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": aboutPageId,
        url: `${SITE_URL}/${lang}/about`,
        name: dict.aboutPage.meta.title,
        description: dict.aboutPage.meta.description,
        inLanguage: bcp47Locale(lang),
        isPartOf: { "@id": ids.website },
        mainEntity: { "@id": ids.business },
        breadcrumb: { "@id": breadcrumbId },
      },
      {
        "@type": "Organization",
        "@id": ids.business,
        name: dict.metadata.name,
        url: `${SITE_URL}/${lang}`,
        logo: `${SITE_URL}/og-image.jpg`,
        description: dict.metadata.description,
        foundingDate: FOUNDING_DATE,
        founder: { "@id": ids.founder },
        email: dict.metadata.email,
        telephone: dict.metadata.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lisbon",
          addressCountry: "PT",
        },
        sameAs: dict.metadata.sameAs,
      },
      {
        "@type": "Person",
        "@id": ids.founder,
        name: dict.about.founder.name,
        jobTitle: dict.about.founder.role,
        description: dict.about.founder.description,
        worksFor: { "@id": ids.business },
        knowsAbout: [
          "Artificial Intelligence",
          "AI Automation",
          "Web Development",
          "Marketing Automation",
          "Generative Engine Optimization",
          "Answer Engine Optimization",
        ],
        nationality: "Portuguese",
        sameAs: [FOUNDER_LINKEDIN],
      },
      breadcrumb,
    ],
  };

  return (
    <ThemeProvider>
      <BackgroundSphere />
      <Navbar dict={dict.navbar} lang={lang} alternates={localeAlternates} />
      <main>
        <JsonLd data={jsonLd} />
        <AboutPageExtras dict={dict.aboutPage} />
        <About dict={dict.about} />
      </main>
      <Footer dict={dict.footer} />
      <ChatWidget dict={dict.chat} lang={lang} />
      <WhatsappButton dict={dict.whatsapp} />
    </ThemeProvider>
  );
}
