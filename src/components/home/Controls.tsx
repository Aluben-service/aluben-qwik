import { component$, $, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { ArrowBackIcon, ArrowForwardIcon, RefreshIcon, BookmarkIcon, CodeIcon, PanelIcon } from "~/components/Icons";
import Swal from "sweetalert2";

interface ErudaWindow extends Window {
    eruda?: {
      init: () => void;
      show: () => void;
      hide: () => void;
      _$el: HTMLElement[];
    };
  }

export const Controls = component$(({ store }) => {
          const isDevtoolsVisible = useStore({ visible: false });
    
      // eslint-disable-next-line qwik/no-use-visible-task
      useVisibleTask$(async () => {
        const savedBookmarks = localStorage.getItem("bookmarks");
        if (savedBookmarks) {
          store.bookmarks = JSON.parse(savedBookmarks);
        }
      });
    
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


  return (
    <section id="controls">
      <button aria-label="Go forward" onClick$={() => window.chemicalAction("forward", "web")}>
        <ArrowForwardIcon />
      </button>
      <button aria-label="Go back" onClick$={() => window.chemicalAction("back", "web")}>
        <ArrowBackIcon />
      </button>
      <button aria-label="Reload" onClick$={() => window.chemicalAction("reload", "web")}>
        <RefreshIcon />
      </button>
      <input
        autofocus
        spellcheck={false}
        autocomplete="off"
        id="search"
        data-frame="web"
        data-auto-https
        data-search-engine="https://search.brave.com/search?q=%s"
        placeholder="Search or Enter a URL"
        is="chemical-input"
      />
      <button aria-label="Add a bookmark for the current page" onClick$={addBookmark}>
        <BookmarkIcon />
      </button>
      <button aria-label="Developer tools" onClick$={() => toggleDevtools()}>
        <CodeIcon />
      </button>
      <button aria-label="Open sidebar" onClick$={() => store.sidebarVisible = !store.sidebarVisible}>
        <PanelIcon />
      </button>
    </section>
  );
});
