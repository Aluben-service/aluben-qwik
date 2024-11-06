
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
          <label>
            <span>Display Name</span>
            <input type="text" placeholder="John Doe" />
          </label>
        </div>
        <div class={styles.settingItem}>
          <label>
            <span>Email</span>
            <input type="email" placeholder="john@example.com" />
          </label>
        </div>
      </section>

      <section class={styles.settingSection}>
        <h2>Preferences</h2>
        <div class={styles.settingItem}>
          <label class={styles.toggle}>
            <span>Dark Mode</span>
            <input type="checkbox" />
            <span class={styles.slider}></span>
          </label>
        </div>
        <div class={styles.settingItem}>
          <label class={styles.toggle}>
            <span>Email Notifications</span>
            <input type="checkbox" />
            <span class={styles.slider}></span>
          </label>
        </div>
      </section>

      <section class={styles.settingSection}>
        <h2>Privacy</h2>
        <div class={styles.settingItem}>
          <label>
            <span>Profile Visibility</span>
            <select>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="friends">Friends Only</option>
            </select>
          </label>
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
