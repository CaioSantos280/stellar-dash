import { create } from "zustand";

export const useUIStore = create((set) => ({
  mode: "dashboard",
  setMode: (mode) => set({ mode }),
  loading: true,
  setLoading: (value) => set({ loading: value }),
}));
