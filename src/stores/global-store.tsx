import { $, createContextId } from '@builder.io/qwik';
import { component$, useContextProvider, useStore } from '@builder.io/qwik';
import { Slot } from '@builder.io/qwik';
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
// Create the store hook
export const useGlobalStore = () => {
  const store = useStore<GlobalStore>(initialState);
  // Actions to update strings
  const setwisp = $((value: string) => {
    store.wisp = value;
  });
  const setservice = $((value: string) => {
    store.service = value;
  });
  const setsearchEngine = $((value: string) => {
    store.searchEngine = value;
  });
  // Reset all strings
  const resetStrings = $(() => {
    store.wisp = 'wss://phantom.lol/wisp/';
    store.service = 'uv';
    store.searchEngine = 'https://search.brave.com/search?q=%s';
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

  return <Slot></Slot>;
});