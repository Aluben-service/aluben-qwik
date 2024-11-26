/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import { isDev } from "@builder.io/qwik/build";
import {
  renderToStream,
  type RenderOptions,
  type RenderToStreamOptions,
} from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";
import Root from "./root";
import { config } from "./speak-config";

export function extractBase({
  serverData,
}: RenderOptions): string {
  if (!isDev && serverData?.locale) {
    return `/build/${serverData.locale}`;
  }
  return "/build";
}

export default function (opts: RenderToStreamOptions) {
  const lang = opts.serverData?.locale || config.defaultLocale.lang;

  return renderToStream(<Root />, {
    manifest,
    ...opts,
    base: extractBase,
    containerAttributes: {
      lang,
      ...opts.containerAttributes,
    },
  });
}
