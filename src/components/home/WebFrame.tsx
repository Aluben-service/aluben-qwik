import { component$ } from "@builder.io/qwik";

export const WebFrame = component$(({ store }) => {
  return (
    <iframe
      ref={(el) => {
        store.web = el;
      }}
      id="web"
      title="proxied website"
      class={`web-frame ${store.sidebarVisible ? "sidebar-visible" : ""}`}
    />
  );
});
