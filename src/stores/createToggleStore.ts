import { create } from "zustand";

/**
 * Creates a Zustand store for managing a single boolean toggle state under a dynamic key.
 *
 * The returned object provides hooks for accessing the entire store, the toggle state, the setter action, and the raw boolean value. The setter function is named dynamically based on the provided key (e.g., `setActive` for key `"active"`).
 *
 * @param key - The name of the boolean state property to manage
 * @param initialValue - The initial value of the toggle state (defaults to `false`)
 * @returns An object containing `useStore`, `useState`, `useActions`, and `useValue` hooks for interacting with the toggle state
 */
export function createToggleStore(
  key: string,
  initialValue: boolean = false
) {
  const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
  const setterName = `set${capitalizedKey}`;

  // Use any for the store type to avoid complex type gymnastics
  const useStore = create<any>((set) => ({
    [key]: initialValue,
    [setterName]: (value: boolean) =>
      set((state: any) => ({
        ...state,
        [key]: value,
      })),
  }));

  // Selector hooks for optimized re-renders
  const useState = () => {
    const value = useStore((state: any) => state[key]);
    return { [key]: value };
  };

  const useActions = () => {
    const setter = useStore((state: any) => state[setterName]);
    return { [setterName]: setter };
  };

  // Individual field selector for granular updates
  const useValue = () => useStore((state: any) => state[key]);

  return {
    useStore,
    useState,
    useActions,
    useValue,
  };
}