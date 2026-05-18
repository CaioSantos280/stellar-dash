import { create } from "zustand";

export const useUIStore = create((set) => ({
  mode: "dashboard",

  loading: true,

  setLoading: (value) =>
    set({
      loading: value,
    }),

  setMode: (mode) =>
    set({
      mode,
    }),
}));