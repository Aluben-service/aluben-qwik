import { component$ } from "@builder.io/qwik";
import { 
  ArrowBackIcon, 
  ArrowForwardIcon, 
  RefreshIcon, 
  BookmarkIcon, 
  CodeIcon, 
  PanelIcon 
} from "~/components/Icons";
import { useControls } from './hooks';
import { createEventHandlers } from './eventHandlers';

export const Controls = component$<{ store: any }>(({ store }) => {
  const { chemical, isDevtoolsVisible } = useControls(store);
  const { addBookmark, toggleDevtools } = createEventHandlers(store, isDevtoolsVisible);

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
        data-service={chemical.service}
        data-auto-https
        data-search-engine={chemical.searchEngine}
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