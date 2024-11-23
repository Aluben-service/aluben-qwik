import { component$ } from "@builder.io/qwik";

export const WebFrame = component$<{ store: any }>(({ store }) => {
  return (
    <iframe
      ref={(el) => {
        store.web = el;
      }}
      id="web"
      title="proxied website"
      class={`web-frame ${store.sidebarVisible ? "sidebar-visible" : ""} fixed bottom-0 left-0 right-0 top-10 h-[calc(100%-5rem)] w-full flex-grow select-none border-none bg-[#212121] transition-[width] duration-300 ease-in-out`}
    />
  );
});
