import { notFound } from "next/navigation";
import {
  getDictionary,
  hasLocale,
  getServicesDictionary,
} from "../../dictionaries";
import ThemeProvider from "../../_components/theme-provider";
import BackgroundSphere from "../../_components/background-sphere";
import Navbar from "../../_components/navbar";
import Footer from "../../_components/footer";
import ChatWidget from "../../_components/chat-widget";
import WhatsappButton from "../../_components/whatsapp-button";
import ServiceLanding from "../../_components/service-landing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.surgex.pt";

const SERVICE_SLUGS = [
  "ai-solutions",
  "websites",
  "automation",
  "marketing",
  "geo-aeo",
  "training",
];

export async function generateStaticParams() {
  return SERVICE_SLUGS.flatMap((slug) =>
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

  const servicesDict = await getServicesDictionary(lang);
  const service =
    servicesDict.services[slug as keyof typeof servicesDict.services];
  if (!service) return {};

  const otherLang = lang === "pt" ? "en" : "pt";

  return {
    title: service.meta.title,
    description: service.meta.description,
    alternates: {
      canonical: `${siteUrl}/${lang}/services/${slug}`,
      languages: {
        [lang]: `${siteUrl}/${lang}/services/${slug}`,
        [otherLang]: `${siteUrl}/${otherLang}/services/${slug}`,
      },
    },
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      url: `${siteUrl}/${lang}/services/${slug}`,
      type: "website",
      images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }],
      locale: lang === "pt" ? "pt_PT" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: service.meta.title,
      description: service.meta.description,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const servicesDict = await getServicesDictionary(lang);
  const service =
    servicesDict.services[slug as keyof typeof servicesDict.services];

  if (!service) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.meta.description,
    provider: {
      "@type": "Organization",
      name: "SurgeX",
      url: "https://www.surgex.pt",
    },
    url: `${siteUrl}/${lang}/services/${slug}`,
  };

  const faqJsonLd = service.faq?.items?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faq.items.map(
          (item: { question: string; answer: string }) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })
        ),
      }
    : null;

  return (
    <ThemeProvider>
      <BackgroundSphere />
      <Navbar dict={dict.navbar} lang={lang} />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {faqJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        )}
        <ServiceLanding service={service} lang={lang} />
      </main>
      <Footer dict={dict.footer} />
      <ChatWidget dict={dict.chat} lang={lang} />
      <WhatsappButton dict={dict.whatsapp} />
    </ThemeProvider>
  );
}
