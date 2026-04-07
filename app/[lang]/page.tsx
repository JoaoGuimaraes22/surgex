import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import ThemeProvider from "./_components/theme-provider";
import Navbar from "./_components/navbar";
import Hero from "./_components/hero";
import Services from "./_components/services";
import Pricing from "./_components/pricing";
import Portfolio from "./_components/portfolio";
import Process from "./_components/process";
import About from "./_components/about";
import Stats from "./_components/stats";
import Faq from "./_components/faq";
import Contact from "./_components/contact";
import Footer from "./_components/footer";
import ChatWidget from "./_components/chat-widget";
import WhatsappButton from "./_components/whatsapp-button";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item: { question: string; answer: string }) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <ThemeProvider>
      <Navbar dict={dict.navbar} />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <Hero dict={dict.hero} />
        <Services dict={dict.services} lang={lang} />
        <Pricing dict={dict.pricing} />
        <Portfolio dict={dict.portfolio} lang={lang} />
        <Process dict={dict.process} />
        <About dict={dict.about} />
        <Stats dict={dict.stats} />
        <Faq dict={dict.faq} />
        <Contact dict={dict.contact} />
      </main>
      <Footer dict={dict.footer} />
      <ChatWidget dict={dict.chat} lang={lang} />
      <WhatsappButton dict={dict.whatsapp} />
    </ThemeProvider>
  );
}
