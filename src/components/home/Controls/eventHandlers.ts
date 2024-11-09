import { $ } from "@builder.io/qwik";
import Swal from "sweetalert2";
import type { ErudaWindow } from './types';

export const createEventHandlers = (store: any, isDevtoolsVisible: { visible: boolean }) => {
  const saveBookmarks = $(() => {
    localStorage.setItem("bookmarks", JSON.stringify(store.bookmarks));
  });

  const addBookmark = $(async () => {
    const currentUrl = store.web?.contentWindow?.location.href;
    if (currentUrl) {
      const existingBookmark = store.bookmarks.find((bookmark: string) => {
        const parsedBookmark = JSON.parse(bookmark);
        return parsedBookmark.url === currentUrl;
      });

      if (!existingBookmark) {
        const output = await Swal.fire({
          title: "Name: ",
          input: "text",
          inputPlaceholder: "[Bookmark name]",
          showCancelButton: true,
          confirmButtonText: "Ok",
        });
        const bookmark = {
          url: currentUrl,
          name: output.value || "[Bookmark name]",
        };
        store.bookmarks.push(JSON.stringify(bookmark));
        saveBookmarks();
      } else {
        Swal.fire({
          title: "Bookmark already exists!",
          text: "There already is a bookmark for this URL.",
          icon: "info",
          confirmButtonText: "Ok",
        });
      }
    }
  });

  const toggleDevtools = $(() => {
    const contentWindow = store.web?.contentWindow as ErudaWindow;

    if (!contentWindow.eruda) {
      const erudaScript = document.createElement("script");
      erudaScript.src = "https://cdn.jsdelivr.net/npm/eruda";
      contentWindow.document.body.append(erudaScript);

      erudaScript.onload = () => {
        contentWindow.eruda?.init();
        const entryBtn = contentWindow.eruda?._$el[0]?.querySelector(
          ".eruda-entry-btn"
        ) as HTMLElement;
        entryBtn.style.setProperty("display", "none");

        const toggleErudaVisibility = () => {
          if (isDevtoolsVisible.visible) {
            contentWindow.eruda?.hide();
          } else {
            contentWindow.eruda?.show();
          }
          isDevtoolsVisible.visible = !isDevtoolsVisible.visible;
        };

        toggleErudaVisibility();
      };
    } else {
      if (isDevtoolsVisible.visible) {
        contentWindow.eruda.hide();
      } else {
        contentWindow.eruda.show();
      }
      isDevtoolsVisible.visible = !isDevtoolsVisible.visible;
    }
  });

  return {
    addBookmark,
    toggleDevtools
  };
};
