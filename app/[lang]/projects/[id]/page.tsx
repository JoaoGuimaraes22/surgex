import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import ThemeProvider from "../../_components/theme-provider";
import Navbar from "../../_components/navbar";
import ProjectShowcase from "../../_components/project-showcase";

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
      <Navbar dict={dict.navbar} hideLinks />
      <main>
        <ProjectShowcase project={project} portfolio={dict.portfolio} lang={lang} />
      </main>
    </ThemeProvider>
  );
}
