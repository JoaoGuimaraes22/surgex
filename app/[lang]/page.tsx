import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import ThemeProvider from "./_components/theme-provider";
import Navbar from "./_components/navbar";
import Hero from "./_components/hero";
import Services from "./_components/services";
import Portfolio from "./_components/portfolio";
import Process from "./_components/process";
import Stats from "./_components/stats";
import Contact from "./_components/contact";
import Footer from "./_components/footer";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <ThemeProvider>
      <Navbar dict={dict.navbar} />
      <main>
        <Hero dict={dict.hero} />
        <Services dict={dict.services} />
        <Portfolio dict={dict.portfolio} lang={lang} />
        <Process dict={dict.process} />
        <Stats dict={dict.stats} />
        <Contact dict={dict.contact} />
      </main>
      <Footer dict={dict.footer} />
    </ThemeProvider>
  );
}
