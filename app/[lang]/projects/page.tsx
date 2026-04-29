import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import ThemeProvider from "../_components/theme-provider";
import Navbar from "../_components/navbar";
import BackgroundSphere from "../_components/background-sphere";
import ProjectsGallery from "../_components/projects-gallery";
import Footer from "../_components/footer";
import ChatWidget from "../_components/chat-widget";
import JsonLd from "../_components/json-ld";
import { SITE_URL, ogLocale } from "../_lib/seo";

const siteUrl = SITE_URL;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    title: dict.projectsPage.meta.title,
    description: dict.projectsPage.meta.description,
    alternates: {
      canonical: `${siteUrl}/${lang}/projects`,
      languages: {
        en: `${siteUrl}/en/projects`,
        pt: `${siteUrl}/pt/projects`,
      },
    },
    openGraph: {
      title: dict.projectsPage.meta.title,
      description: dict.projectsPage.meta.description,
      url: `${siteUrl}/${lang}/projects`,
      type: "website",
      images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }],
      locale: ogLocale(lang),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.projectsPage.meta.title,
      description: dict.projectsPage.meta.description,
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: dict.projectsPage.meta.title,
    description: dict.projectsPage.meta.description,
    url: `${siteUrl}/${lang}/projects`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: dict.portfolio.projects.length,
      itemListElement: dict.portfolio.projects.slice(0, 10).map(
        (p: { id: string; name: string; url: string }, i: number) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          url: `${siteUrl}/${lang}/projects/${p.id}`,
        })
      ),
    },
    provider: {
      "@type": "Organization",
      name: "SurgeX",
      url: siteUrl,
    },
  };

  return (
    <ThemeProvider>
      <BackgroundSphere />
      <Navbar
        dict={dict.navbar}
        hideLinks
        backHref={`/${lang}`}
        nicheNav={{ items: dict.projectsPage.nicheNav, label: dict.projectsPage.nicheNavLabel }}
      />
      <main>
        <JsonLd data={jsonLd} />
        <ProjectsGallery
          dict={dict.projectsPage}
          portfolio={dict.portfolio}
          lang={lang}
        />
      </main>
      <Footer dict={dict.footer} />
      <ChatWidget dict={dict.chat} lang={lang} />
    </ThemeProvider>
  );
}
