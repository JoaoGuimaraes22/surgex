import { notFound } from "next/navigation";
import {
  getDictionary,
  hasLocale,
  getLegalDictionary,
} from "../../dictionaries";
import ThemeProvider from "../../_components/theme-provider";
import Navbar from "../../_components/navbar";
import BackgroundSphere from "../../_components/background-sphere";
import Footer from "../../_components/footer";
import ChatWidget from "../../_components/chat-widget";
import WhatsappButton from "../../_components/whatsapp-button";
import { SITE_URL, ogLocale } from "../../_lib/seo";

const siteUrl = SITE_URL;

const validSlugs = ["privacy", "terms", "cookies"] as const;
type LegalSlug = (typeof validSlugs)[number];

function isValidSlug(slug: string): slug is LegalSlug {
  return validSlugs.includes(slug as LegalSlug);
}

export async function generateStaticParams() {
  const locales = ["en", "pt"] as const;
  const params: { lang: string; slug: string }[] = [];

  for (const lang of locales) {
    for (const slug of validSlugs) {
      params.push({ lang, slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isValidSlug(slug)) return {};

  const legalDict = await getLegalDictionary(lang);
  const meta = legalDict.meta[slug];

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${siteUrl}/${lang}/legal/${slug}`,
      languages: {
        en: `${siteUrl}/en/legal/${slug}`,
        pt: `${siteUrl}/pt/legal/${slug}`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteUrl}/${lang}/legal/${slug}`,
      type: "website",
      images: [
        { url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 },
      ],
      locale: ogLocale(lang),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!hasLocale(lang)) notFound();
  if (!isValidSlug(slug)) notFound();

  const dict = await getDictionary(lang);
  const legalDict = await getLegalDictionary(lang);
  const page = legalDict[slug as keyof typeof legalDict];

  if (!page || typeof page !== "object" || !("headline" in page)) notFound();

  const { label, headline, lastUpdated, sections } = page as {
    label: string;
    headline: string;
    lastUpdated: string;
    sections: { title: string; content: string[] }[];
  };

  return (
    <ThemeProvider>
      <BackgroundSphere />
      <Navbar dict={dict.navbar} lang={lang} />
      <main>
        <section className="overflow-hidden py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <header className="mb-16">
              <span className="font-mono text-[9px] uppercase tracking-[2px] text-muted">
                {label}
              </span>
              <h1
                className="mt-4 font-sans font-extralight leading-[0.9] tracking-[-1px]"
                style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
              >
                {headline}
              </h1>
              <p className="mt-4 font-sans text-sm text-muted">
                {lastUpdated}
              </p>
            </header>

            <div className="space-y-12">
              {sections.map((section, i) => (
                <div key={i}>
                  <h2 className="font-sans text-xl font-semibold tracking-tight sm:text-2xl">
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.content.map((paragraph, j) => (
                      <p
                        key={j}
                        className="font-sans text-base leading-7 text-muted"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer dict={dict.footer} />
      <ChatWidget dict={dict.chat} lang={lang} />
      <WhatsappButton dict={dict.whatsapp} />
    </ThemeProvider>
  );
}
