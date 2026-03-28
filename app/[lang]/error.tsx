"use client";

import { useParams } from "next/navigation";

const text = {
  pt: { title: "Algo correu mal", retry: "Tentar novamente" },
  en: { title: "Something went wrong", retry: "Try again" },
} as Record<string, { title: string; retry: string }>;

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { lang } = useParams<{ lang: string }>();
  const t = text[lang] ?? text.en;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <h2 className="text-xl font-semibold">{t.title}</h2>
      <button
        onClick={reset}
        className="rounded-full bg-foreground px-5 py-2 text-sm text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        {t.retry}
      </button>
    </div>
  );
}
