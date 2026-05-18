import { create } from "zustand";

export const useSystemStore = create((set, get) => ({
  /* ---------------- STATE ---------------- */

  battery: 78,
  cpu: 15,
  ram: 35,
  network: 70,

  notifications: [],

  systemLoopId: null,
  batteryLoopId: null,

  /* ---------------- SYSTEM LOOP ---------------- */

  startSystemLoop: () => {
    if (get().systemLoopId) return;

    const id = setInterval(() => {
      set((state) => ({
        cpu: Math.max(
          5,
          Math.min(
            100,
            state.cpu + (Math.random() * 18 - 9)
          )
        ),

        ram: Math.max(
          10,
          Math.min(
            100,
            state.ram + (Math.random() * 10 - 5)
          )
        ),

        network: Math.max(
          20,
          Math.min(
            100,
            state.network + (Math.random() * 25 - 12)
          )
        ),
      }));
    }, 1200);

    set({ systemLoopId: id });
  },

  /* ---------------- BATTERY LOOP ---------------- */

  startBatteryLoop: () => {
    if (get().batteryLoopId) return;

    const id = setInterval(() => {
      set((state) => ({
        battery: Math.max(0, state.battery - 0.25),
      }));
    }, 1000);

    set({ batteryLoopId: id });
  },

  /* ---------------- INIT / STOP ---------------- */

  initSystem: () => {
    get().startSystemLoop();
    get().startBatteryLoop();
  },

  stopSystem: () => {
    clearInterval(get().systemLoopId);
    clearInterval(get().batteryLoopId);

    set({
      systemLoopId: null,
      batteryLoopId: null,
    });
  },

  /* ---------------- NOTIFICATIONS ---------------- */

  addNotification: (message) => {
    const id = Date.now();

    set((state) => ({
      notifications: [
        {
          id,
          message,
          createdAt: Date.now(),
        },
        ...state.notifications,
      ],

      cpu: Math.min(100, state.cpu + 5),
    }));

    setTimeout(() => {
      get().removeNotification(id);
    }, 5000);
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id
      ),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  /* ---------------- HELPERS ---------------- */

  rechargeBattery: () => {
    set((state) => ({
      battery: Math.min(100, state.battery + 10),
    }));
  },

  resetSystem: () => {
    set({
      battery: 100,
      cpu: 10,
      ram: 20,
      network: 80,
      notifications: [],
    });
  },

  isCritical: () => {
    const state = get();

    return (
      state.battery < 20 ||
      state.cpu > 90 ||
      state.ram > 90
    );
  },
}));