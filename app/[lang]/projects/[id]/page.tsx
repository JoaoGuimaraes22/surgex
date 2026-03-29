import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import { i18n } from "@/i18n-config";
import ThemeProvider from "../../_components/theme-provider";
import Navbar from "../../_components/navbar";
import ProjectShowcase from "../../_components/project-showcase";

const PROJECT_IDS = ["harvey", "vetavencas", "apjardins", "popei", "santoamaro", "mademoiselle"];

export function generateStaticParams() {
  return i18n.locales.flatMap((lang) =>
    PROJECT_IDS.map((id) => ({ lang, id }))
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const project = dict.portfolio.projects.find(
    (p: { id: string }) => p.id === id
  );

  if (!project) notFound();

  return (
    <ThemeProvider>
      <Navbar dict={dict.navbar} />
      <main>
        <ProjectShowcase project={project} portfolio={dict.portfolio} lang={lang} />
      </main>
    </ThemeProvider>
  );
}
