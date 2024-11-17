import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { Controls } from "~/components/Controls/";
import { Sidebar } from "~/components/Sidebar";
import { WebFrame } from "~/components/WebFrame";
import type { DocumentHead } from "@builder.io/qwik-city";
import { analytics, perf } from '../services/firebase';
import { InvisibleNav } from "~/components/InvisibleNav";

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
      console.log('Firebase Analytics initialized');
    }
  });


  return (
    <>
      <Controls store={store} />
      <main id="container">
        {store.sidebarVisible && <Sidebar store={store} />}
        <WebFrame store={store} />
      </main>
      <footer>&copy; 2024 Aluben Services, Inc.</footer>
      <InvisibleNav/>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Aluben',
  meta: [
    {
      name: 'description',
      content: 'A clean and simple proxy browser built with Qwik.',
    },
    {
      name: 'keywords',
      content: 'qwik, aluben, proxy, browser, uv, ultraviolet, rammerhead, rh',
    },
  ],
};
