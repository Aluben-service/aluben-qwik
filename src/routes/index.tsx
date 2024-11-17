import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { Controls } from "~/components/Controls/";
import { Sidebar } from "~/components/Sidebar";
import { WebFrame } from "~/components/WebFrame";
import type { DocumentHead } from "@builder.io/qwik-city";
import { analytics } from '../services/firebase';
import { Navbar } from '~/components/Navbar';

export default component$(() => {
  const store = useStore({
    web: null,
    bookmarks: [],
    newBookmark: "",
    sidebarVisible: false,
  });

  const state = useStore({ showNavbar: false });

  // Add keyboard event listener
  useVisibleTask$(() => {
    if (analytics) {
      console.log('Firebase Analytics initialized');
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check both e.altKey and e.key.toLowerCase() includes 'alt' for better compatibility
      const isAltPressed = e.ctrlKey || e.key.toLowerCase().includes('ctrl');
      
      // Check if 'a' key is pressed (case insensitive)
      const isPressed = e.key.toLowerCase() == '/';

      if (isAltPressed && isPressed) {
        state.showNavbar = !state.showNavbar;
        e.preventDefault(); // Prevent default browser behavior
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });


  return (
    <>
          {state.showNavbar && <Navbar />}

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
