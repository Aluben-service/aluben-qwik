import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { isDev } from "@builder.io/qwik/build";

import "./global.css";
import { QwikPartytown } from "./components/partytown/partytown";

export default component$(() => {

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        <QwikPartytown />
        <a title="Web Analytics" href="https://clicky.com/101471077"><img alt="Clicky" src="//static.getclicky.com/media/links/badge.gif" border="0" /></a>
        <script type="text/partytown" async src="//static.getclicky.com/101471077.js" />

        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <ServiceWorkerRegister />
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  );
});
