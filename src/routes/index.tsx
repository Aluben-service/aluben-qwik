import { component$, useStore, $, useVisibleTask$ } from "@builder.io/qwik";
import { Controls } from "~/components/Controls";
import { Sidebar } from "~/components/Sidebar";
import { WebFrame } from "~/components/WebFrame";
import type { DocumentHead } from "@builder.io/qwik-city";

interface Store {
  web: string | null;
  bookmarks: string[];
  newBookmark: string;
  sidebarVisible: boolean;
}

// Custom hook with proper typing
const useSidebarShortcut = (store: Store) => {
  // Handler for keydown events needs to be inside useVisibleTask$
  useVisibleTask$(({ cleanup }) => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for Ctrl+B or Cmd+B (for Mac)
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "b") {
        event.preventDefault(); // Prevent default browser behavior
        store.sidebarVisible = !store.sidebarVisible;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listener when component unmounts
    cleanup(() => {
      window.removeEventListener("keydown", handleKeyDown);
    });
  });
};

export default component$(() => {
  const store = useStore<Store>({
    web: null,
    bookmarks: [],
    newBookmark: "",
    sidebarVisible: false,
  });

  useSidebarShortcut(store);

  return (
    <div class="flex min-h-screen flex-col">
      <Controls store={store} />
      <main id="container" class="flex-1">
        <div class="flex h-full">
          {store.sidebarVisible && <Sidebar store={store} />}
          <WebFrame store={store} />
        </div>
      </main>
      <footer class="p-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Aluben Services, Inc.
      </footer>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Aluben",
  meta: [
    {
      name: "description",
      content: "A clean and simple proxy browser built with Qwik.",
    },
    {
      name: "keywords",
      content: "qwik, aluben, proxy, browser, uv, ultraviolet, rammerhead, rh",
    },
  ],
};
