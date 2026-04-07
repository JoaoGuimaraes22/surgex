import { notFound } from "next/navigation";
import { getDictionary, hasLocale, getCitiesDictionary } from "../../dictionaries";
import ThemeProvider from "../../_components/theme-provider";
import BackgroundSphere from "../../_components/background-sphere";
import Navbar from "../../_components/navbar";
import Footer from "../../_components/footer";
import ChatWidget from "../../_components/chat-widget";
import WhatsappButton from "../../_components/whatsapp-button";
import CityLanding from "../../_components/city-landing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.surgex.pt";

const CITY_SLUGS = ["carcavelos"];

export async function generateStaticParams() {
  return CITY_SLUGS.flatMap((slug) =>
    ["en", "pt"].map((lang) => ({ lang, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};

  const citiesDict = await getCitiesDictionary(lang);
  const city = citiesDict.cities[slug as keyof typeof citiesDict.cities];
  if (!city) return {};

  const otherLang = lang === "pt" ? "en" : "pt";

  return {
    title: citiesDict.meta.title,
    description: citiesDict.meta.description,
    alternates: {
      canonical: `${siteUrl}/${lang}/cities/${slug}`,
      languages: {
        [lang]: `${siteUrl}/${lang}/cities/${slug}`,
        [otherLang]: `${siteUrl}/${otherLang}/cities/${slug}`,
      },
    },
    openGraph: {
      title: citiesDict.meta.title,
      description: citiesDict.meta.description,
      url: `${siteUrl}/${lang}/cities/${slug}`,
      type: "website",
      images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }],
      locale: lang === "pt" ? "pt_PT" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: citiesDict.meta.title,
      description: citiesDict.meta.description,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!hasLocale(lang)) notFound();

  const citiesDict = await getCitiesDictionary(lang);
  const city = citiesDict.cities[slug as keyof typeof citiesDict.cities];

  if (!city) notFound();

  const dict = await getDictionary(lang);

  // Filter portfolio projects by city
  const cityProjects = dict.portfolio.projects.filter(
    (p: { location?: string }) =>
      p.location?.toLowerCase() === city.name.toLowerCase()
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SurgeX",
    description: citiesDict.meta.description,
    url: `${siteUrl}/${lang}/cities/${slug}`,
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "Country",
        name: "Portugal",
      },
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
      <Navbar dict={dict.navbar} lang={lang} />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CityLanding dict={city} projects={cityProjects} lang={lang} />
      </main>
      <Footer dict={dict.footer} />
      <ChatWidget dict={dict.chat} lang={lang} />
      <WhatsappButton dict={dict.whatsapp} />
    </ThemeProvider>
  );
}
