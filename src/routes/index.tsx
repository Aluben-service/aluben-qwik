import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { Controls } from "~/components/Controls/";
import { Sidebar } from "~/components/Sidebar";
import { WebFrame } from "~/components/WebFrame";
import type { DocumentHead } from "@builder.io/qwik-city";
import { analytics } from "../services/firebase";

interface Store {
  web: string | null;
  bookmarks: string[];
  newBookmark: string;
  sidebarVisible: boolean;
}

const useSidebarShortcut = (store: Store) => {
  useVisibleTask$(({ cleanup }) => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "b") {
        event.preventDefault();
        store.sidebarVisible = !store.sidebarVisible;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

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


  // Add keyboard event listener
  useVisibleTask$(() => {
    if (analytics) {
      console.log("Firebase Analytics initialized");
    }
  });

  return (
    <>
      <Controls store={store} />
      <main class={"flex flex-1 mt-10"} id="container">
        {store.sidebarVisible && <Sidebar store={store} />}
        <WebFrame store={store} />
      </main>
      <footer class={"mt-auto p-4 text-xs text-[aliceblue]"}>
        &copy; {new Date().getFullYear()} Aluben Services, Inc.
      </footer>
          </>
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
