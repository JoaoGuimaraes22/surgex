import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import ThemeProvider from "../_components/theme-provider";
import Navbar from "../_components/navbar";
import BackgroundSphere from "../_components/background-sphere";
import ProjectsGallery from "../_components/projects-gallery";
import Footer from "../_components/footer";
import ChatWidget from "../_components/chat-widget";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.surgex.pt";

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
