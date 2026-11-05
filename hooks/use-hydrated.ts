import { useSyncExternalStore } from "react";

const subscribeToNothing = () => () => {};

// False on the server and during hydration, then true. Pages showing saved browser data wait for
// this so they don't flash their empty state on reload.
export function useHydrated() {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}
