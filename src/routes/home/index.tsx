import { component$, useStore } from "@builder.io/qwik";
import { Controls } from "~/components/home/Controls";
import { Sidebar } from "~/components/home/Sidebar";
import { WebFrame } from "~/components/home/WebFrame";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const store = useStore({
    web: null,
    bookmarks: [],
    newBookmark: "",
    sidebarVisible: false,
  });

  return (
    <>
      <Controls store={store} />
      <main id="container">
        {store.sidebarVisible && <Sidebar store={store} />}
        <WebFrame store={store} />
      </main>
      <footer>&copy; 2024 Aluben Services, Inc.</footer>
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
