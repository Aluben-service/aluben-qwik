import { component$, Slot } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { InvisibleNav } from "~/components/InvisibleNav";
import { extractLang, useI18n } from "~/i18n";

export const onRequest: RequestHandler = ({ locale, params }) => {
  locale(extractLang(params.locale));
};

export default component$(() => {
  useI18n();
    return (
      <>
        <InvisibleNav />
        <Slot />
      </>
    );
});
