import { useStore, useVisibleTask$, useContext } from "@builder.io/qwik";
import { GlobalContext } from '~/stores/global-store';

export function useControls(store: any) {
  const chemical = useContext(GlobalContext);        
  const isDevtoolsVisible = useStore({ visible: false });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      store.bookmarks = JSON.parse(savedBookmarks);
    }
  });

  return {
    chemical,
    isDevtoolsVisible
  };
}