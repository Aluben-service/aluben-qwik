import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <>
      <input
        autofocus
        spellcheck={false}
        autocomplete="off"
        id="search"
        placeholder="Search or Enter a URL"
      />
      <section id="controls">
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
