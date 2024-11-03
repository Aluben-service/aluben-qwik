import { component$, $, useStore } from '@builder.io/qwik';

interface ErudaWindow extends Window {
  eruda?: {
    init: () => void;
    show: () => void;
    hide: () => void;
    _$el: HTMLElement[];
  };
}

export default component$(() => {
  const store = useStore<{ web: HTMLIFrameElement | null }>({ web: null });
  const isDevtoolsVisible = useStore({ visible: false });

  const toggleDevtools = $(() => {
    const contentWindow = store.web?.contentWindow as ErudaWindow;

    if (contentWindow) {
      if (!contentWindow.eruda) {
        const erudaScript = document.createElement('script');
        erudaScript.src = 'https://cdn.jsdelivr.net/npm/eruda';
        contentWindow.document.body.append(erudaScript);

        erudaScript.onload = () => {
          contentWindow.eruda?.init();

          // Hide the entry button
          const entryBtn = contentWindow.eruda?._$el[0]?.querySelector('.eruda-entry-btn') as HTMLElement;
          entryBtn.style.setProperty('display', 'none');

          // Inline function to toggle visibility
          const toggleErudaVisibility = () => {
            if (isDevtoolsVisible.visible) {
              contentWindow.eruda?.hide();
            } else {
              contentWindow.eruda?.show();
            }
            isDevtoolsVisible.visible = !isDevtoolsVisible.visible; // Toggle the visibility state
          };

          toggleErudaVisibility(); // Call the function after initialization
        };
      } else {
        // Function to toggle visibility if Eruda is already loaded
        if (isDevtoolsVisible.visible) {
          contentWindow.eruda?.hide();
        } else {
          contentWindow.eruda?.show();
        }
        isDevtoolsVisible.visible = !isDevtoolsVisible.visible; // Toggle the visibility state
      }
    }
  });
  return (
    <>
      <section id="controls">
      <button onClick$={() => window.chemicalAction('back', 'web')}><svg
            xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#ffffff"
            preserveAspectRatio="xMidYMid meet">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
          </svg></button>
        <button onClick$={() => window.chemicalAction('forward', 'web')}><svg
            xmlns="http://www.w3.org/2000/svg" style="transform: rotate(180deg)" width="24" height="24"
            viewBox="0 0 24 24" fill="#ffffff" preserveAspectRatio="xMidYMid meet">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
          </svg></button>
        <button onClick$={() => window.chemicalAction('reload', 'web')}><svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#ffffff">
            <path
              d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
          </svg></button>
      <input
        autofocus spellcheck={false} autocomplete="off" id="search" data-frame="web" data-auto-https data-search-engine="https://www.google.com/search?q=%s" placeholder="Search or Enter a URL" is="chemical-input"
      />
              <button onClick$={toggleDevtools}>
          {isDevtoolsVisible.visible ? 'Hide Devtools' : 'Show Devtools'}
        </button>
      </section>
      <iframe
              ref={(el) => { store.web = el; }}

                id="web"
        class="web-frame"
      />
    </>
  );
});