import { useSyncExternalStore } from "react";

export default function usePrefersReducedMotion() {
  const subscribe = (onStoreChange: () => void) => {
    if (typeof window === "undefined") {
      return () => {};
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    mediaQuery.addEventListener("change", onStoreChange);

    return () => {
      mediaQuery.removeEventListener("change", onStoreChange);
    };
  };

  const getSnapshot = () => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
