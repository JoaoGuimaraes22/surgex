import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import ThemeProvider from "../../_components/theme-provider";
import Navbar from "../../_components/navbar";
import BackgroundSphere from "../../_components/background-sphere";
import ProjectShowcase from "../../_components/project-showcase";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.surgex.pt";

// TEMP: hide projects for interested prospects (remove when no longer needed)
const HIDDEN_IDS = ["revicar", "vet-lpda", "laundry-grace", "barbershop-specialone", "harvey", "mm-detalhe", "autobody-jpautopaint"];

export async function generateStaticParams() {
  const dict = await getDictionary("en");
  return dict.portfolio.projects
    .filter((p: { id: string }) => !HIDDEN_IDS.includes(p.id))
    .flatMap((p: { id: string }) =>
      ["en", "pt"].map((lang) => ({ lang, id: p.id }))
    );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang);
  const project = dict.portfolio.projects.find(
    (p: { id: string }) => p.id === id
  );
  if (!project) return {};

  const otherLang = lang === "pt" ? "en" : "pt";
  const title = `${project.name} | SurgeX`;
  const description = project.description;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${lang}/projects/${id}`,
      languages: {
        [lang]: `${siteUrl}/${lang}/projects/${id}`,
        [otherLang]: `${siteUrl}/${otherLang}/projects/${id}`,
      },
    },
    openGraph: {
      title: project.name,
      description,
      url: `${siteUrl}/${lang}/projects/${id}`,
      type: "website",
      locale: lang === "pt" ? "pt_PT" : "en_US",
      images: [
        {
          url: `${siteUrl}${project.image}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: project.name,
      description,
      images: [`${siteUrl}${project.image}`],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  if (HIDDEN_IDS.includes(id)) notFound();
  const project = dict.portfolio.projects.find(
    (p: { id: string }) => p.id === id
  );

  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: project.name,
    description: project.description,
    url: `${siteUrl}/${lang}/projects/${id}`,
    about: {
      "@type": "LocalBusiness",
      name: project.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: project.location,
        addressCountry: "PT",
      },
      ...(project.rating && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: project.rating,
          ...(project.reviewCount && {
            reviewCount: project.reviewCount.replace("+", ""),
          }),
        },
      }),
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
      <Navbar dict={dict.navbar} hideLinks backHref={`/${lang}/projects`} />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ProjectShowcase project={project} portfolio={dict.portfolio} lang={lang} />
      </main>
    </ThemeProvider>
  );
}
