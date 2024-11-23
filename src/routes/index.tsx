
import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { Controls } from "~/components/Controls/";
import { Sidebar } from "~/components/Sidebar";
import { WebFrame } from "~/components/WebFrame";
import type { DocumentHead } from "@builder.io/qwik-city";
import { analytics } from "../services/firebase";

export default component$(() => {
  const store = useStore({
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
    <body></body>
      <Controls store={store} />
      <main class={"flex flex-1 mt-10"} id="container">
        {store.sidebarVisible && <Sidebar store={store} />}
        <WebFrame store={store} />
      </main>
      <footer class={"mt-auto p-4 text-xs text-[aliceblue]"}>
        &copy; 2024 Aluben Services, Inc.
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
