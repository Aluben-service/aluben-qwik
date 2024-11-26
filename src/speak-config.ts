import type { SpeakConfig } from "qwik-speak";

export const config: SpeakConfig = {
  // Note that we expand on the locale config
  // here, setting a currency and time zone.
  defaultLocale: {
    lang: "en-US",
    currency: "USD",
    timeZone: "America/Los_Angeles",
  },
  supportedLocales: [
    {
      lang: "zh-CN",
      currency: "USD",
      timeZone: "Asia/Shanghai",
    },
    {
      lang: "en-US",
      currency: "USD",
      timeZone: "America/Los_Angeles",
    },
  ],

  // Translations available in the whole
  // app. These map to files under our
  // `i18n/{lang}` directories.
  assets: ["app"],

  // Translations that require dynamic keys,
  // and cannot be set at compile-time.
  runtimeAssets: [],
};