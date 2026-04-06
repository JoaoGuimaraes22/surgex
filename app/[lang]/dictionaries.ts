import "server-only";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  pt: () => import("./dictionaries/pt.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

const blogDictionaries = {
  en: () =>
    import("./dictionaries/blog-en.json").then((module) => module.default),
  pt: () =>
    import("./dictionaries/blog-pt.json").then((module) => module.default),
};

export const getBlogDictionary = async (locale: Locale) =>
  blogDictionaries[locale]();

const servicesDictionaries = {
  en: () =>
    import("./dictionaries/services-en.json").then((module) => module.default),
  pt: () =>
    import("./dictionaries/services-pt.json").then((module) => module.default),
};

export const getServicesDictionary = async (locale: Locale) =>
  servicesDictionaries[locale]();
