import { useStore, useVisibleTask$, useContext } from "@builder.io/qwik";

export function useControls(store: any) {
  const isDevtoolsVisible = useStore({ visible: false });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      store.bookmarks = JSON.parse(savedBookmarks);
    }
  });

  return {
    isDevtoolsVisible
  };
}