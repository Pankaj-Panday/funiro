type PersistedStore<T> = {
  getInitialState: () => T;
  setState: (state: T) => unknown;
  persist: {
    getOptions: () => { name?: string };
    rehydrate: () => unknown;
  };
};

// Without this, a tab holding an old copy of the store overwrites newer changes from other tabs.
export function syncAcrossTabs<T>(store: PersistedStore<T>) {
  if (typeof window === "undefined") return;

  window.addEventListener("storage", ({ key, newValue }) => {
    // The key is null when another tab calls localStorage.clear().
    if (key !== null && key !== store.persist.getOptions().name) return;

    // Rehydrating keeps the current state when nothing is saved, so a clear needs its own reset.
    if (newValue === null) {
      store.setState(store.getInitialState());
    } else {
      store.persist.rehydrate();
    }
  });
}
