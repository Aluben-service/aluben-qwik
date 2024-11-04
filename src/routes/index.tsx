import { component$, $, useStore, useVisibleTask$ } from "@builder.io/qwik";
import Swal from "sweetalert2";
import {
  CodeIcon,
  RefreshIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
  BookmarkIcon,
  PanelIcon,
} from "~/components/Icons";

interface ErudaWindow extends Window {
  eruda?: {
    init: () => void;
    show: () => void;
    hide: () => void;
    _$el: HTMLElement[];
  };
}

export default component$(() => {
  const store = useStore<{
    web: HTMLIFrameElement | null;
    bookmarks: string[];
    newBookmark: string;
    sidebarVisible: boolean;
  }>({
    web: null,
    bookmarks: [],
    newBookmark: "",
    sidebarVisible: false,
  });

  const isDevtoolsVisible = useStore({ visible: false });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
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
      const existingBookmark = store.bookmarks.find((bookmark) => {
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
          text: `There already is a bookmark for this URL.`,
          icon: "info",
          confirmButtonText: "Ok",
        });
      }
    }
  });

  const toggleSidebar = $(() => {
    store.sidebarVisible = !store.sidebarVisible;
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

  const enterBookmark = $((bookmark: string) => {
    const webElement = document.getElementById("web") as HTMLIFrameElement;
    webElement.src = JSON.parse(bookmark).url;
  });

  return (
    <>
      <section id="controls">
        <button onClick$={() => window.chemicalAction("forward", "web")}>
          <ArrowForwardIcon />
        </button>
        <button onClick$={() => window.chemicalAction("back", "web")}>
          <ArrowBackIcon />
        </button>
        <button onClick$={() => window.chemicalAction("reload", "web")}>
          <RefreshIcon />
        </button>
        <input
          autofocus
          spellcheck={false}
          autocomplete="off"
          id="search"
          data-frame="web"
          data-auto-https
          data-search-engine="https://www.google.com/search?q=%s"
          placeholder="Search or Enter a URL"
          is="chemical-input"
        />
        <button onClick$={addBookmark}>
          <BookmarkIcon />
        </button>
        <button onClick$={toggleDevtools}>
          <CodeIcon />
        </button>
        <button onClick$={toggleSidebar}>
          <PanelIcon />
        </button>
      </section>

      <section id="container">
        {store.sidebarVisible && (
          <aside class="sidebar">
            <h2>Bookmarks</h2>
            <ul>
              {store.bookmarks.map((bookmark) => (
                <li key={bookmark}>
                  <button
                    class="bookmark"
                    onClick$={() => enterBookmark(bookmark)}
                  >
                    {JSON.parse(bookmark).name}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <iframe
          ref={(el) => {
            store.web = el;
          }}
          id="web"
          class={`web-frame ${store.sidebarVisible ? "sidebar-visible" : ""}`}
        />
      </section>
    </>
  );
});
