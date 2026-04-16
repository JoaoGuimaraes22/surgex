import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { i18n } from "@/i18n-config";
import { getDictionary, hasLocale } from "./dictionaries";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const OG_LOCALES: Record<string, string> = {
  pt: "pt_PT",
  en: "en_US",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) return {};

  const dict = await getDictionary(lang);
  const { title, description, name } = dict.metadata;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}`,
      languages: {
        ...Object.fromEntries(i18n.locales.map((l) => [l, `${SITE_URL}/${l}`])),
        "x-default": `${SITE_URL}/${i18n.defaultLocale}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}`,
      siteName: name,
      images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630 }],
      locale: OG_LOCALES[lang] ?? "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.jpg`],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": dict.metadata.type || "LocalBusiness",
    name: dict.metadata.name,
    description: dict.metadata.description,
    url: `${SITE_URL}/${lang}`,
    ...(dict.metadata.phone && { telephone: dict.metadata.phone }),
    ...(dict.metadata.email && { email: dict.metadata.email }),
    image: `${SITE_URL}/og-image.jpg`,
    ...(dict.metadata.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: dict.metadata.address,
        addressCountry: "PT",
      },
    }),
    ...(dict.metadata.geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: dict.metadata.geo.latitude,
        longitude: dict.metadata.geo.longitude,
      },
    }),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    ...(dict.metadata.priceRange && { priceRange: dict.metadata.priceRange }),
    ...(dict.metadata.sameAs && { sameAs: dict.metadata.sameAs }),
  };

  return (
    <html lang={lang} className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded"
        >
          {dict.ui.skipToContent}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\u003c"),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
