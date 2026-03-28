import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import LocaleSwitcher from "./_components/locale-switcher";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <main className="flex w-full max-w-2xl flex-col items-center gap-8 px-6 py-24 text-center">
        <LocaleSwitcher />
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {dict.home.title}
        </h1>
        <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
          {dict.home.description}
        </p>
      </main>
    </div>
  );
}
