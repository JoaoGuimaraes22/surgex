import { notFound } from "next/navigation";
import { getDictionary, hasLocale, getBlogDictionary } from "../dictionaries";
import { getAllPosts } from "../_lib/blog";
import ThemeProvider from "../_components/theme-provider";
import Navbar from "../_components/navbar";
import BackgroundSphere from "../_components/background-sphere";
import Footer from "../_components/footer";
import ChatWidget from "../_components/chat-widget";
import WhatsappButton from "../_components/whatsapp-button";
import BlogCard from "../_components/blog-card";
import JsonLd from "../_components/json-ld";
import { SITE_URL, buildBreadcrumb, breadcrumbLabel } from "../_lib/seo";

const siteUrl = SITE_URL;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const blogDict = await getBlogDictionary(lang);

  return {
    title: blogDict.meta.title,
    description: blogDict.meta.description,
    alternates: {
      canonical: `${siteUrl}/${lang}/blog`,
      languages: {
        en: `${siteUrl}/en/blog`,
        pt: `${siteUrl}/pt/blog`,
      },
    },
    openGraph: {
      title: blogDict.meta.title,
      description: blogDict.meta.description,
      url: `${siteUrl}/${lang}/blog`,
      type: "website",
      images: [{ url: `${siteUrl}/og-image.jpg`, width: 1200, height: 630 }],
      locale: lang === "pt" ? "pt_PT" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: blogDict.meta.title,
      description: blogDict.meta.description,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const blogDict = await getBlogDictionary(lang);
  const posts = getAllPosts(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: blogDict.meta.title,
    description: blogDict.meta.description,
    url: `${siteUrl}/${lang}/blog`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.slice(0, 10).map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: post.title,
        url: `${siteUrl}/${lang}/blog/${post.slug}`,
      })),
    },
  };

  const breadcrumbJsonLd = buildBreadcrumb(lang, [
    { name: breadcrumbLabel(lang, "blog"), path: "/blog" },
  ]);

  return (
    <ThemeProvider>
      <BackgroundSphere />
      <Navbar dict={dict.navbar} lang={lang} />
      <main>
        <JsonLd data={jsonLd} />
        <JsonLd data={breadcrumbJsonLd} />
        <section className="relative z-[5] overflow-hidden px-10 pt-32 pb-24">
          {/* Section header */}
          <div className="mb-16">
            <span className="font-mono text-[9px] uppercase tracking-[2px] text-muted">
              {blogDict.label}
            </span>
            <h1
              className="mt-4 font-sans font-extralight leading-[0.9] tracking-[-1px]"
              style={{ fontSize: "clamp(32px, 5vw, 64px)" }}
            >
              {blogDict.headline}
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              {blogDict.description}
            </p>
          </div>

          {/* Posts grid */}
          {posts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  lang={lang}
                  readMore={blogDict.readMore}
                  index={i}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">{blogDict.noPosts}</p>
          )}
        </section>
      </main>
      <Footer dict={dict.footer} />
      <ChatWidget dict={dict.chat} lang={lang} />
      <WhatsappButton dict={dict.whatsapp} />
    </ThemeProvider>
  );
}
