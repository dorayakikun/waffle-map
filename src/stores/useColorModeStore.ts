import { create } from "zustand";

export type ColorMode = "light" | "dark";

function applyColorModeToDocument(mode: ColorMode): void {
  document.documentElement.classList.toggle("dark", mode === "dark");
  document.documentElement.style.colorScheme = mode;
}

type ColorModeState = {
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
};

export const useColorModeStore = create<ColorModeState>((set, get) => ({
  colorMode: "light",
  setColorMode: (colorMode) => {
    applyColorModeToDocument(colorMode);
    set({ colorMode });
  },
  toggleColorMode: () => {
    const next: ColorMode = get().colorMode === "light" ? "dark" : "light";
    applyColorModeToDocument(next);
    set({ colorMode: next });
  },
}));
