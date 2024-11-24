import { component$ } from "@builder.io/qwik";
import { isBrowser } from "@builder.io/qwik/build";
import {
  TbReload,
  TbArrowLeft,
  TbArrowRight,
  TbStar,
  TbCode,
  TbLayoutSidebarRightExpandFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "@qwikest/icons/tablericons";
import { useControls } from "./hooks";
import { createEventHandlers } from "./eventHandlers";

export const Controls = component$<{ store: any }>(({ store }) => {
  const { isDevtoolsVisible } = useControls(store);
  const { addBookmark, toggleDevtools } = createEventHandlers(
    store,
    isDevtoolsVisible,
  );
  let searchEngine;
  if (isBrowser) {
    searchEngine = localStorage.getItem("@chemical/searchEngine");
  }

  return (
    <section
      id="controls"
      class="fixed left-0 right-0 z-10 flex h-[var(--spacing-fluid-xl)] items-center justify-center gap-[var(--spacing-fluid-sm)] px-[var(--spacing-fluid-sm)]"
    >
      <button
        aria-label="Go forward"
        onClick$={() => window.chemicalAction("forward", "web")}
      >
        <TbArrowLeft />
      </button>
      <button
        aria-label="Go back"
        onClick$={() => window.chemicalAction("back", "web")}
      >
        <TbArrowRight />
      </button>
      <button
        aria-label="Reload"
        onClick$={() => window.chemicalAction("reload", "web")}
      >
        <TbReload />
      </button>
      <input
        autofocus
        spellcheck={false}
        autocomplete="off"
        id="search"
        data-frame="web"
        data-service-store
        data-auto-https
        {...(searchEngine
          ? { "data-search-engine-store": true }
          : { "data-search-engine": "https://search.brave.com/search?q=%s" })}
        placeholder="Search or Enter a URL"
        is="chemical-input"
        class="font-inherit w-[clamp(200px,50vw,42rem)] max-w-[calc(100%-var(--spacing-fluid-xl))] animate-[fadeIn_1.5s_ease-in-out] rounded-2xl border-none bg-[#2f2f2f] px-[var(--spacing-fluid-sm)] py-[calc(var(--spacing-fluid-sm)/4)] text-inherit outline-none"
      />
      <button
        aria-label="Add a bookmark for the current page"
        onClick$={addBookmark}
      >
        <TbStar />
      </button>
      <button aria-label="Developer tools" onClick$={() => toggleDevtools()}>
        <TbCode />
      </button>
      <button
        aria-label="Open sidebar"
        onClick$={() => (store.sidebarVisible = !store.sidebarVisible)}
      >
        {store.sidebarVisible ? (
          <TbLayoutSidebarRightCollapseFilled />
        ) : (
          <TbLayoutSidebarRightExpandFilled />
        )}
      </button>
    </section>
  );
});
