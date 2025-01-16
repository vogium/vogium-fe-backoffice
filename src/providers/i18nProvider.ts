import { I18nProvider } from "@refinedev/core";

import enMessages from "../locales/en.json";
import trMessages from "../locales/tr.json";

const messages = {
  en: enMessages,
  tr: trMessages,
};

export const i18nProvider: I18nProvider = {
  translate: (key: string, params: object = {}) => {
    const currentLocale = localStorage.getItem("locale") || "en";
    //console.log("key", key, "params", params, "currentLocale", currentLocale);
    const keys = key.split(".");

    let current: any = messages[currentLocale as keyof typeof messages];
    for (const k of keys) {
      if (current === undefined) return key;
      current = current[k];
    }

    if (typeof current !== "string") return key;

    return Object.entries(params).reduce((acc, [key, value]) => {
      return acc.replace(`{{${key}}}`, String(value));
    }, current);
  },

  changeLocale: async (lang: string) => {
    localStorage.setItem("locale", lang);
    //refresh the page
    console.log("changeLocale", lang);
    window.location.reload();
    return;
  },

  getLocale: () => {
    return localStorage.getItem("locale") || "en";
  },
};
