import { create } from "zustand";

export interface ToggleState<T extends string> {
  [key: string]: boolean;
}

export interface ToggleActions<T extends string> {
  [key: string]: (value: boolean) => void;
}

export type ToggleStore<T extends string> = ToggleState<T> & ToggleActions<T>;

export function createToggleStore<T extends string>(
  key: T,
  initialValue: boolean = false
) {
  const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
  const setterName = `set${capitalizedKey}` as const;

  type State = { [K in T]: boolean };
  type Actions = { [K in typeof setterName]: (value: boolean) => void };
  type Store = State & Actions;

  const initialState = { [key]: initialValue } as State;

  const useStore = create<Store>((set) => ({
    ...initialState,
    [setterName]: (value: boolean) =>
      set((state) => ({
        ...state,
        [key]: value,
      })),
  } as Store));

  // Selector hooks for optimized re-renders
  const useState = () => {
    const value = useStore((state) => state[key]);
    return { [key]: value } as { [K in T]: boolean };
  };

  const useActions = () => {
    const setter = useStore((state) => state[setterName]);
    return { [setterName]: setter } as { [K in typeof setterName]: (value: boolean) => void };
  };

  // Individual field selector for granular updates
  const useValue = () => useStore((state) => state[key]);

  return {
    useStore,
    useState,
    useActions,
    useValue,
  };
}