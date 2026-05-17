import { create } from "zustand";

export const useSystemStore = create((set, get) => ({
  mode: "dashboard",
  battery: 78,
  notifications: [],

  // 🔁 MODE
  setMode: (mode) => set({ mode }),

  // 🔔 NOTIFICATIONS ENGINE
  addNotification: (message) => {
    const id = Date.now();

    set((state) => ({
      notifications: [
        { id, message },
        ...state.notifications,
      ],
    }));

    // auto remove depois de 5s
    setTimeout(() => {
      get().removeNotification(id);
    }, 5000);
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearNotifications: () => set({ notifications: [] }),

  // ⚡ SYSTEM INTELLIGENCE (fake mas reativo)
  setBattery: (value) => set({ battery: value }),

  drainBattery: () =>
    set((state) => ({
      battery: Math.max(0, state.battery - 1),
    })),

  boostBattery: () =>
    set((state) => ({
      battery: Math.min(100, state.battery + 1),
    })),
}));