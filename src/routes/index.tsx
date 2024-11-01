import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <>
      <section id="controls">
      <input
        autofocus spellcheck={false} autocomplete="off" id="search" data-frame="web" data-auto-https data-search-engine="https://www.google.com/search?q=%s" placeholder="Search or Enter a URL" is="chemical-input"
      />
        <button onClick$={() => window.chemicalAction('back', 'web')}>Back</button>
        <button onClick$={() => window.chemicalAction('forward', 'web')}>Forward</button>
        <button onClick$={() => window.chemicalAction('reload', 'web')}>Reload</button>
        <button onClick$={() => window.chemicalAction('close', 'web')}>Close</button>
      </section>
      <iframe
        id="web"
        class="web-frame"
      />
    </>
  );
});
