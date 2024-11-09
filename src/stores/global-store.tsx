import { $, createContextId, useTask$ } from '@builder.io/qwik';
import { component$, useContextProvider, useStore } from '@builder.io/qwik';
import { Slot } from '@builder.io/qwik';
import { isBrowser } from '@builder.io/qwik/build';

// Define the store interface
interface GlobalStore {
  wisp: string;
  service: string;
  searchEngine: string;
}

// Create initial state
const initialState: GlobalStore = {
  wisp: 'wss://phantom.lol/wisp/',
  service: 'uv',
  searchEngine: 'https://search.brave.com/search?q=%s'
};

// Create context ID for the store
export const GlobalContext = createContextId<GlobalStore>('simple-store');

// Safe localStorage operations
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (isBrowser) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.error('Error accessing localStorage:', e);
        return null;
      }
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    if (isBrowser) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.error('Error setting localStorage:', e);
      }
    }
  }
};

// Create the store hook
export const useGlobalStore = () => {
  const store = useStore<GlobalStore>(initialState);

  useTask$(() => {
    const stored = safeLocalStorage.getItem('global-store');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        store.wisp = data.wisp;
        store.service = data.service;
        store.searchEngine = data.searchEngine;
      } catch (e) {
        console.error('Error parsing stored data:', e);
      }
    }
  });

  // Actions to update strings
  const setwisp = $((value: string) => {
    store.wisp = value;
    safeLocalStorage.setItem("wisp", store.wisp);
    safeLocalStorage.setItem('global-store', JSON.stringify(store));
  });

  const setservice = $((value: string) => {
    store.service = value;
    safeLocalStorage.setItem('global-store', JSON.stringify(store));
  });

  const setsearchEngine = $((value: string) => {
    store.searchEngine = value;
    safeLocalStorage.setItem("searchEngine", store.searchEngine);
    safeLocalStorage.setItem('global-store', JSON.stringify(store));
  });

  // Reset all strings
  const resetStrings = $(() => {
    store.wisp = initialState.wisp;
    store.service = initialState.service;
    store.searchEngine = initialState.searchEngine;
    safeLocalStorage.setItem('global-store', JSON.stringify(store));
  });

  return {
    store,
    actions: {
      setwisp,
      setservice,
      setsearchEngine,
      resetStrings
    }
  };
};

// Create provider component
export const GlobalStoreProvider = component$(() => {
  const { store } = useGlobalStore();
  useContextProvider(GlobalContext, store);
  return <Slot />;
});