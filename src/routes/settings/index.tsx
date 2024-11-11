
import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import styles from './settings.module.css';

export default component$(() => {
  return (
    <div class={styles.settingsContainer}>
      <h1>Settings</h1>
      
      <main class={styles.settingsGrid}>
      <section class={styles.settingSection}>
        <h2>Account Settings</h2>
        <div class={styles.settingItem}>
        <label>Search Engine:</label>
        <select is="chemical-select" data-default-store="service">
    <option value="uv">Ultraviolet</option>
    <option value="rammerhead">Rammerhead</option>
    <option value="scramjet">Scramjet</option>
    <option value="meteor">Meteor</option>
</select> 
        <input 
          type="text" 
          class="text-black"
          onInput$={(e) => window.chemical.setStore("searchEngine", (e.target as HTMLInputElement).value)}
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
