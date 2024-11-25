import { $, component$ } from "@builder.io/qwik";

export const Sidebar = component$<{ store: any }>(({ store }) => {
  const enterBookmark = $((bookmark: string) => {
    const webElement = document.getElementById("web") as HTMLIFrameElement;
    webElement.src = JSON.parse(bookmark).url;
  });

  return (
    <aside
      class="sidebar fixed right-0 top-[var(--spacing-fluid-xl)] h-[calc(100%-var(--spacing-fluid-xl))] w-[var(--sidebar-width)] animate-[slideInSidebar_0.5s_ease_forwards] overflow-y-auto border-l border-[#ccc] bg-[#212121] p-[var(--spacing-fluid-sm)] shadow-[-2px_0_5px_rgba(0,0,0,0.1)]"
    >
      <h2 class="text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 text-white">Bookmarks</h2>
      <ul>
        {store.bookmarks.map((bookmark: string) => (
          <li key={bookmark}>
            <button class="bookmark" onClick$={() => enterBookmark(bookmark)}>
              {JSON.parse(bookmark).name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
});
