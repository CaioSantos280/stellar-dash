import { create } from "zustand";

export const useSystemStore = create((set, get) => ({
  mode: "dashboard",

  battery: 78,
  cpu: 15,
  ram: 35,
  network: 70,

  notifications: [],

  intervalId: null,
  batteryId: null,

  /* ---------------- SYSTEM LOOPS ---------------- */

  startSystemLoop: () => {
    if (get().intervalId) return;

    const id = setInterval(() => {
      set((state) => ({
        cpu: Math.max(5, Math.min(100, state.cpu + (Math.random() * 18 - 9))),
        ram: Math.max(10, Math.min(100, state.ram + (Math.random() * 10 - 5))),
        network: Math.max(20, Math.min(100, state.network + (Math.random() * 25 - 12))),
      }));
    }, 1200);

    set({ intervalId: id });
  },

  startBatteryLoop: () => {
    if (get().batteryId) return;

    const id = setInterval(() => {
      set((state) => ({
        battery: Math.max(0, state.battery - 0.25),
      }));
    }, 1000);

    set({ batteryId: id });
  },

  stopSystem: () => {
    clearInterval(get().intervalId);
    clearInterval(get().batteryId);

    set({ intervalId: null, batteryId: null });
  },

  initSystem: () => {
    get().startSystemLoop();
    get().startBatteryLoop();
  },

  /* ---------------- MODE ---------------- */

  setMode: (mode) => set({ mode }),

  /* ---------------- NOTIFICATIONS ---------------- */

  addNotification: (message) => {
    const id = Date.now();

    set((state) => ({
      notifications: [{ id, message }, ...state.notifications],
      cpu: Math.min(100, state.cpu + 5),
    }));

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

  /* ---------------- INTEL ---------------- */

  isCritical: () => {
    const s = get();
    return s.battery < 20 || s.cpu > 90;
  },
}));