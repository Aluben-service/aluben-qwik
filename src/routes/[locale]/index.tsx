import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { Controls } from "~/components/Controls/";
import { Sidebar } from "~/components/Sidebar";
import { WebFrame } from "~/components/WebFrame";
import type { DocumentHead } from "@builder.io/qwik-city";
import localforage from "localforage";
import $ from "jquery";
import { translate } from "~/lib/utils";


interface Store {
  web: string | null;
  bookmarks: Array<string>;
  newBookmark: string;
  sidebarVisible: boolean;
  showOnboarding: boolean | null;
}


export default component$(() => {

  const store = useStore<Store>({
    web: null,
    bookmarks: [],
    newBookmark: "",
    sidebarVisible: false,
    showOnboarding: null
  });

  useVisibleTask$(async () => {
    // Check if user has seen onboarding using localforage
    await localforage.setDriver(localforage.INDEXEDDB);
    const hasSeenOnboarding = await localforage.getItem('hasSeenOnboarding');
    store.showOnboarding = !hasSeenOnboarding;
  });

  return (
    <>
      <Controls store={store} />
      <main class={"flex flex-1 mt-10"} id="container">
        {store.sidebarVisible ? <Sidebar store={store} /> : null}
        <WebFrame store={store} />

        {store.showOnboarding && (
          <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-gray-800 p-6 rounded-lg max-w-md">
              <h2 class="text-xl text-white mb-4">Welcome to Aluben!</h2>
              <p class="text-gray-300 mb-4">Here are some helpful shortcuts to get you started:</p>
              <ul class="text-gray-300 mb-6 space-y-2">
                <li>• Press <kbd class="bg-gray-700 px-2 py-1 rounded">Ctrl</kbd> + <kbd class="bg-gray-700 px-2 py-1 rounded">/</kbd> to toggle the navigation bar</li>
              </ul>
              <button
                type="button"
                onClick$={async () => {
                  store.showOnboarding = false;
                  await localforage.setItem('hasSeenOnboarding', true);
                  $('#container').fadeIn(400);
                }}
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                {translate`confirm`}
              </button>
            </div>
          </div>
        )}
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

