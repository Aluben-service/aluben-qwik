
import { component$, useContext } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import styles from './settings.module.css';
import { GlobalContext, useGlobalStore } from '~/stores/global-store.tsx';

export default component$(() => {
  const chemical = useContext(GlobalContext);         
  const { actions } = useGlobalStore();
  return (
    <div class={styles.settingsContainer}>
      <h1>Settings</h1>
      
      <main class={styles.settingsGrid}>
      <section class={styles.settingSection}>
        <h2>Account Settings</h2>
        <div class={styles.settingItem}>
        <label>Search Engine:</label>
        <input 
          type="text" 
          class="text-black"
          value={chemical.searchEngine} 
          onInput$={(e) => actions.setsearchEngine((e.target as HTMLInputElement).value)}
        />
        </div>
      </section>


</main>
      <div class={styles.actions}>
        <button class={styles.saveButton}>Save Changes</button>
        <Link href="/" class={styles.cancelButton}>Cancel</Link>
      </div>
    </div>
  );
});
