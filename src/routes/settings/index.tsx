/* eslint-disable qwik/no-use-visible-task */
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import type { DocumentHead} from '@builder.io/qwik-city';
import styles from './settings.module.css';
import localforage from 'localforage';

export default component$(() => {
  const searchEngine = useSignal('');
  const service = useSignal('');
  const transport = useSignal('');
  const autoHttps = useSignal(false);
  const highContrast = useSignal(false);
  const fontSize = useSignal('medium');
  const animations = useSignal(true);

  // Load initial values from localforage
  useVisibleTask$(async () => {
    await localforage.setDriver(localforage.INDEXEDDB);
    searchEngine.value = (await localforage.getItem('@chemical/searchEngine') as string) || 'https://search.brave.com/search?q=%s';
    service.value = (await localforage.getItem('@chemical/service') as string) || 'uv';
    transport.value = (await localforage.getItem('@chemical/transport') as string) || 'libcurl';
    autoHttps.value = (await localforage.getItem('@chemical/autoHttps')) === true;
    highContrast.value = (await localforage.getItem('@chemical/highContrast')) === true;
    fontSize.value = (await localforage.getItem('@chemical/fontSize') as string) || 'medium';
    animations.value = (await localforage.getItem('@chemical/animations')) !== false;
  });

  return (
    <div class={styles.settingsContainer}>
      <h1>Settings</h1>
      
      <main class={styles.settingsGrid}>
        <section class={styles.settingSection}>
          <h2>Proxy Settings</h2>
          <div class={styles.settingItem}>
            <label for="service-select">Service:</label>
            <select 
              id="service-select"
              value={service.value}
              onChange$={async (e) => {
                const value = (e.target as HTMLSelectElement).value;
                service.value = value;
                await localforage.setItem('@chemical/service', value);
              }}
            >
              <option value="uv">Ultraviolet</option>
              <option value="rammerhead">Rammerhead</option>
              <option value="scramjet">Scramjet</option>
              <option value="meteor">Meteor</option>
            </select>
          </div>

          <div class={styles.settingItem}>
            <label for="transport-select">Transport:</label>
            <select
              id="transport-select"
              value={transport.value}
              onChange$={async (e) => {
                const value = (e.target as HTMLSelectElement).value;
                transport.value = value;
                await localforage.setItem('@chemical/transport', value);
              }}
            >
              <option value="libcurl">LibCurl</option>
              <option value="epoxy">Epoxy</option>
            </select>
          </div>

          <div class={styles.settingItem}>
            <label for="auto-https-checkbox">Auto HTTPS:</label>
            <label class={styles.toggle} style={{ flexDirection: "row-reverse" }}>
              <input
                type="checkbox"
                checked={autoHttps.value}
                onChange$={async (event: Event, element: HTMLInputElement) => {
                  const value = element.checked;
                  autoHttps.value = value;
                  await localforage.setItem('@chemical/autoHttps', value);
                }}
              />
              <span class={styles.slider} />
            </label>
          </div>
        </section>

        <section class={styles.settingSection}>
          <h2>Accessibility</h2>
          
          <div class={styles.settingItem}>
            <label for="high-contrast-checkbox">High Contrast Mode:</label>
            <label class={styles.toggle} style={{ flexDirection: "row-reverse" }}>
              <input
                id="high-contrast-checkbox"
                type="checkbox"
                checked={highContrast.value}
                onChange$={async (e) => {
                  const value = (e.target as HTMLInputElement).checked;
                  highContrast.value = value;
                  await localforage.setItem('@chemical/highContrast', value);
                }}
              />
              <span class={styles.slider} />
            </label>
          </div>

          <div class={styles.settingItem}>
            <label for="font-size-select">Font Size:</label>
            <select
              id="font-size-select"
              value={fontSize.value}
              onChange$={async (e) => {
                const value = (e.target as HTMLSelectElement).value;
                fontSize.value = value;
                await localforage.setItem('@chemical/fontSize', value);
              }}
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </section>

        <section class={styles.settingSection}>
          <h2>Quality of Life</h2>

          <div class={styles.settingItem}>
            <label for="search-engine-select">Search Engine:</label>
            <select
              id="search-engine-select"
              value={searchEngine.value}
              onChange$={async (e) => {
                const value = (e.target as HTMLSelectElement).value;
                searchEngine.value = value;
                await localforage.setItem('@chemical/searchEngine', value);
              }}
            >
              <option value="https://search.brave.com/search?q=%s">Brave Search</option>
              <option value="https://www.google.com/search?q=%s">Google</option>
              <option value="https://duckduckgo.com/?q=%s">DuckDuckGo</option>
              <option value="https://www.bing.com/search?q=%s">Bing</option>
            </select>
          </div>

          <div class={styles.settingItem}>
            <label for="animations-toggle">Animations:</label>
            <label class={styles.toggle} style={{ flexDirection: "row-reverse" }}>
              <input
                id="animations-toggle"
                type="checkbox"
                checked={animations.value}
                onChange$={async (e) => {
                  const value = (e.target as HTMLInputElement).checked;
                  animations.value = value;
                  await localforage.setItem('@chemical/animations', value);
                }}
              />
              <span class={styles.slider} />
            </label>
          </div>
        </section>
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Settings - Aluben',
  meta: [
    {
      name: 'description',
      content: 'Configure your Aluben proxy settings.',
    },
  ],
};
