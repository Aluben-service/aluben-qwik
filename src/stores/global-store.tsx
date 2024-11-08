// src/stores/global-store.ts
import { $, createContextId } from '@builder.io/qwik';
import { component$, useContextProvider, useStore, useTask$ } from '@builder.io/qwik';
import { Slot } from '@builder.io/qwik';

// Define your store interface - customize these fields as needed
interface GlobalStore {
  service: 'uv' | 'rammerhead';
  engine: string;
  wisp: string;
}

// Initial state
const initialState: GlobalStore = {
  service: 'uv',
  engine: 'https://search.brave.com/search?q=%s',
  wisp: "wss://shadow.lol/wisp/"
};

// DB Configuration
const DB_NAME = 'AppDatabase';
const STORE_NAME = 'globalStore';
const DB_VERSION = 1;

// DB Helper Functions
const openDB = async () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject('IndexedDB not supported');
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

const saveToDB = async (key: string, value: any) => {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    
    return new Promise<void>((resolve, reject) => {
      const request = store.put(value, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => db.close();
    });
  } catch (error) {
    console.error('Error saving to IndexedDB:', error);
    // Fallback to localStorage
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const loadFromDB = async (key: string): Promise<any> => {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => db.close();
    });
  } catch (error) {
    console.error('Error loading from IndexedDB:', error);
    // Fallback to localStorage
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
};

// Create context ID for the store
export const GlobalContext = createContextId<GlobalStore>('global-store');

// Create the store hook
export const useGlobalStore = () => {
  const store = useStore<GlobalStore>(initialState);

  // Load stored data on mount
  useTask$(async () => {
    const storedData = await loadFromDB('globalStore');
    if (storedData) {
      store.engine = storedData.engine ?? initialState.engine;
      store.service = storedData.service ?? initialState.service;
      store.wisp = storedData.wisp ?? initialState.wisp;
    }
  });

  // Actions
  const setEngine = $(async (engine: string) => {
    store.engine = engine;
    await saveToDB('globalStore', store);
  });

  const setService = $(async (service: 'uv' | 'rammerhead') => {
    store.service = service;
    await saveToDB('globalStore', store);
  });

  const setWisp = $(async (wisp: string) => {
    store.wisp = wisp;
    await saveToDB('globalStore', store);
  });

  const resetStore = $(async () => {
    store.wisp = initialState.wisp;
    store.service = initialState.service;
    store.engine = initialState.engine;
    await saveToDB('globalStore', store);
  });

  return {
    store,
    actions: {
      setEngine,
      setService,
      setWisp,
      resetStore
    }
  };
};

// Create provider component
export const GlobalStoreProvider = component$(() => {
  const { store } = useGlobalStore();
  useContextProvider(GlobalContext, store);
  return <Slot />;
});