import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const text = {
  pt: { title: "Página não encontrada", link: "Ir para início" },
  en: { title: "Page not found", link: "Go home" },
};

export default async function NotFound() {
  // not-found.tsx doesn't receive params — default to PT (default locale)
  const t = text.pt;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">{t.title}</h2>
      <Link
        href="/"
        className="rounded-full bg-foreground px-5 py-2 text-sm text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        {t.link}
      </Link>
    </div>
  );
}
