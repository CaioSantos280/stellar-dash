import { create } from "zustand";

export const useSystemStore = create((set, get) => ({
  /* ---------------- STATE ---------------- */

  battery: 78,
  cpu: 15,
  ram: 35,
  network: 70,

  notifications: [],
  systemEvents: [],

  // SEM duplicação, SEM risco de objeto lixo
  eventPulse: 0,

  systemLoopId: null,
  batteryLoopId: null,
  eventLoopId: null,

  /* ---------------- SYSTEM LOOP ---------------- */

  startSystemLoop: () => {
    if (get().systemLoopId) return;

    const id = setInterval(() => {
      set((state) => ({
        cpu: clamp(state.cpu + rand(-9, 9), 5, 100),
        ram: clamp(state.ram + rand(-5, 5), 10, 100),
        network: clamp(state.network + rand(-12, 12), 20, 100),
      }));
    }, 1200);

    set({ systemLoopId: id });
  },

  /* ---------------- BATTERY ---------------- */

  startBatteryLoop: () => {
    if (get().batteryLoopId) return;

    const id = setInterval(() => {
      set((state) => ({
        battery: Math.max(0, state.battery - 0.25),
      }));
    }, 1000);

    set({ batteryLoopId: id });
  },

  /* ---------------- EVENT LOOP (ESTÁVEL) ---------------- */

  startEventLoop: () => {
    if (get().eventLoopId) return;

    const id = setInterval(() => {
      set((state) => {
        const pulse = Math.random();

        return {
          eventPulse: pulse, // SEM OBJETO, SEM MISTÉRIO

          systemEvents: [
            {
              id: Date.now(),
              type: pulse > 0.7 ? "live" : "system",
              message:
                pulse > 0.7
                  ? "high-energy fluctuation detected"
                  : "background system drift detected",
              intensity: pulse,
              timestamp: Date.now(),
            },
            ...state.systemEvents,
          ].slice(0, 12),
        };
      });
    }, 4000);

    set({ eventLoopId: id });
  },

  /* ---------------- INIT ---------------- */

  initSystem: () => {
    get().startSystemLoop();
    get().startBatteryLoop();
    get().startEventLoop();
  },

  stopSystem: () => {
    clearInterval(get().systemLoopId);
    clearInterval(get().batteryLoopId);
    clearInterval(get().eventLoopId);

    set({
      systemLoopId: null,
      batteryLoopId: null,
      eventLoopId: null,
    });
  },

  /* ---------------- NOTIF ---------------- */

  addNotification: (event) => {
    const id = Date.now();

    set((state) => ({
      notifications: [
        {
          id,
          type: event.type,
          message: event.message,
          timestamp: new Date().toLocaleTimeString("en-US", {
            hour12: false,
          }),
        },
        ...state.notifications,
      ].slice(0, 8),

      cpu: Math.min(100, state.cpu + Math.random() * 3),

      // leve boost visual controlado
      eventPulse: 1,
    }));

    setTimeout(() => {
      get().removeNotification(id);
    }, 7000);
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearNotifications: () => set({ notifications: [] }),

  /* ---------------- HELPERS ---------------- */

  rechargeBattery: () =>
    set((state) => ({
      battery: Math.min(100, state.battery + 10),
    })),

  resetSystem: () =>
    set({
      battery: 100,
      cpu: 10,
      ram: 20,
      network: 80,
      notifications: [],
      systemEvents: [],
      eventPulse: 0,
    }),

  isCritical: () => {
    const s = get();
    return s.battery < 20 || s.cpu > 90 || s.ram > 90;
  },
}));

/* ---------------- UTILS ---------------- */

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function rand(min, max) {
  return Math.random() * (max - min) + min;
}