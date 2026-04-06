import { notFound } from "next/navigation";
import {
  getDictionary,
  hasLocale,
  getBlogDictionary,
} from "../../dictionaries";
import { getPostBySlug, getAllPosts } from "../../_lib/blog";
import ThemeProvider from "../../_components/theme-provider";
import Navbar from "../../_components/navbar";
import BackgroundSphere from "../../_components/background-sphere";
import Footer from "../../_components/footer";
import ChatWidget from "../../_components/chat-widget";
import WhatsappButton from "../../_components/whatsapp-button";
import BlogArticle from "../../_components/blog-article";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.surgex.pt";

export async function generateStaticParams() {
  const locales = ["en", "pt"] as const;
  const params: { lang: string; slug: string }[] = [];

  for (const lang of locales) {
    const posts = getAllPosts(lang);
    for (const post of posts) {
      params.push({ lang, slug: post.slug });
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
  if (!hasLocale(lang)) return {};

  const post = getPostBySlug(lang, slug);
  if (!post) return {};

  const otherLang = lang === "pt" ? "en" : "pt";
  const altSlug = post.alternateSlug ?? slug;

  return {
    title: `${post.title} | SurgeX`,
    description: post.description,
    alternates: {
      canonical: `${siteUrl}/${lang}/blog/${slug}`,
      languages: {
        [lang]: `${siteUrl}/${lang}/blog/${slug}`,
        [otherLang]: `${siteUrl}/${otherLang}/blog/${altSlug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteUrl}/${lang}/blog/${slug}`,
      type: "article",
      article: {
        publishedTime: post.date,
      },
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const blogDict = await getBlogDictionary(lang);
  const post = getPostBySlug(lang, slug);

  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "SurgeX",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "SurgeX",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/${lang}/blog/${slug}`,
    },
    inLanguage: lang === "pt" ? "pt-PT" : "en",
  };

  const otherLang2 = lang === "pt" ? "en" : "pt";
  const localeAlternates = {
    [lang]: `/${lang}/blog/${post.slug}`,
    [otherLang2]: `/${otherLang2}/blog/${post.alternateSlug ?? post.slug}`,
  };

  return (
    <ThemeProvider>
      <BackgroundSphere />
      <Navbar dict={dict.navbar} lang={lang} alternates={localeAlternates} />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BlogArticle
          post={post}
          dict={{
            backToBlog: blogDict.backToBlog,
            publishedOn: blogDict.publishedOn,
            category: blogDict.category,
            minuteRead: blogDict.minuteRead,
          }}
          lang={lang}
        />
      </main>
      <Footer dict={dict.footer} />
      <ChatWidget dict={dict.chat} lang={lang} />
      <WhatsappButton dict={dict.whatsapp} />
    </ThemeProvider>
  );
}
