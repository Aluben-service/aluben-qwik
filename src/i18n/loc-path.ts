import { config } from "~/speak-config";

export default function locPath$(
  path: string,
  lang: string,
): string {
  if (path === "/") {
    return `/${lang}`;
  }

  const pathParts = path
    .split("/")
    .filter((segment) => segment);

  if (
    config.supportedLocales.find(
      (locale) => locale.lang === pathParts[0],
    )
  ) {
    pathParts[0] = lang;
  } else {
    pathParts.unshift(lang);
  }

  return `/${pathParts.join("/")}`;
}