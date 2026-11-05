import { useSyncExternalStore } from "react";

// A list saved in localStorage that any component can subscribe to. The server always renders it
// empty, so pages that show the list should wait for useStoreReady to avoid flashing that state.
export function createListStore<T>(storageKey: string) {
  const empty: T[] = [];
  const listeners = new Set<() => void>();
  let items: T[] | null = null;

  function read() {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
      return Array.isArray(parsed) ? (parsed as T[]) : empty;
    } catch {
      return empty;
    }
  }

  function get() {
    items ??= read();
    return items;
  }

  function notify() {
    listeners.forEach((listener) => listener());
  }

  function set(nextItems: T[]) {
    items = nextItems;

    try {
      localStorage.setItem(storageKey, JSON.stringify(nextItems));
    } catch {
      // Storage can be full or blocked; the list still works until the page reloads.
    }

    notify();
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  // Keeps other open tabs from overwriting the list with an old copy.
  if (typeof window !== "undefined") {
    window.addEventListener("storage", (event) => {
      // The key is null when another tab calls localStorage.clear().
      if (event.key !== storageKey && event.key !== null) return;

      items = read();
      notify();
    });
  }

  function useItems() {
    return useSyncExternalStore(subscribe, get, () => empty);
  }

  return { get, set, useItems };
}

const subscribeToNothing = () => () => {};

export function useStoreReady() {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}
