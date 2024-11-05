import { $, component$ } from "@builder.io/qwik";

export const Sidebar = component$(({ store }) => {
  const enterBookmark = $((bookmark: string) => {
    const webElement = document.getElementById("web") as HTMLIFrameElement;
    webElement.src = JSON.parse(bookmark).url;
  });

  return (
    <aside class="sidebar">
      <h2>Bookmarks</h2>
      <ul>
        {store.bookmarks.map((bookmark: string | number | null | undefined) => (
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
