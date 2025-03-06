import { create } from "zustand";

interface StoreState {
  isPrinting: boolean;
  setIsPrinting: (value: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  isPrinting: false,
  setIsPrinting: (value) => set({ isPrinting: value }),
}));
