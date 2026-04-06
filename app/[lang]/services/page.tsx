import { notFound } from "next/navigation";
import { getDictionary, hasLocale, getServicesDictionary } from "../dictionaries";
import ThemeProvider from "../_components/theme-provider";
import BackgroundSphere from "../_components/background-sphere";
import Navbar from "../_components/navbar";
import Footer from "../_components/footer";
import ChatWidget from "../_components/chat-widget";
import WhatsappButton from "../_components/whatsapp-button";
import ServiceHubCard from "../_components/service-hub-card";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.surgex.pt";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const servicesDict = await getServicesDictionary(lang);

  return {
    title: servicesDict.meta.title,
    description: servicesDict.meta.description,
    alternates: {
      canonical: `${siteUrl}/${lang}/services`,
      languages: {
        en: `${siteUrl}/en/services`,
        pt: `${siteUrl}/pt/services`,
      },
    },
    openGraph: {
      title: servicesDict.meta.title,
      description: servicesDict.meta.description,
      url: `${siteUrl}/${lang}/services`,
      type: "website",
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const servicesDict = await getServicesDictionary(lang);

  return (
    <ThemeProvider>
      <BackgroundSphere />
      <Navbar dict={dict.navbar} lang={lang} />
      <main>
        <section className="relative z-[5] overflow-hidden px-10 pt-32 pb-24">
          {/* Section header */}
          <div className="mb-16">
            <span className="font-mono text-[9px] uppercase tracking-[2px] text-muted">
              {servicesDict.hub.label}
            </span>
            <h1
              className="mt-4 font-sans font-extralight leading-[0.9] tracking-[-1px]"
              style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
            >
              {servicesDict.hub.headline}
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              {servicesDict.hub.description}
            </p>
          </div>

          {/* Services grid */}
          <div className="grid gap-px md:grid-cols-2">
            {Object.entries(servicesDict.services).map(
              ([slug, service], i) => (
                <ServiceHubCard
                  key={slug}
                  item={service}
                  slug={slug}
                  i={i}
                  lang={lang}
                  learnMore={servicesDict.hub.learnMore}
                />
              )
            )}
          </div>
        </section>
      </main>
      <Footer dict={dict.footer} />
      <ChatWidget dict={dict.chat} lang={lang} />
      <WhatsappButton dict={dict.whatsapp} />
    </ThemeProvider>
  );
}
