import { create } from "zustand";

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