import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import WeatherCard from "../components/dashboard/WeatherCard";
import MusicCard from "../components/dashboard/MusicCard";
import SystemCard from "../components/dashboard/SystemCard";
import SystemLogCard from "../components/dashboard/SystemLogCard";
import EnergyCoreCard from "../components/dashboard/EnergyCoreCard";
import SignalTrackerCard from "../components/dashboard/SignalTrackerCard";
import LoadingScreen from "../components/system/LoadingScreen";

import Stars from "../components/space/StarsBackground";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";

import Space from "./Space";

import { useSystemStore } from "../state/systemStore";
import { useUIStore } from "../state/uiStore";

import { SYSTEM_EVENTS } from "../data/systemEvents";

export default function Home() {
  const mode = useUIStore((state) => state.mode);
  const loading = useUIStore((state) => state.loading);
  const setLoading = useUIStore((state) => state.setLoading);

  const initSystem = useSystemStore((state) => state.initSystem);
  const stopSystem = useSystemStore((state) => state.stopSystem);
  const addNotification = useSystemStore((state) => state.addNotification);
  const eventPulse = useSystemStore((state) => state.eventPulse);

  useEffect(() => {
    initSystem();
    return () => stopSystem();
  }, [initSystem, stopSystem]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvent =
        SYSTEM_EVENTS[
          Math.floor(Math.random() * SYSTEM_EVENTS.length)
        ];

      addNotification(randomEvent);
    }, 15000);

    return () => clearInterval(interval);
  }, [addNotification]);

  return (
    <>
      {/* LOADING SCREEN */}
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen onFinish={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* MAIN */}
      <main
        className="relative min-h-screen overflow-hidden bg-[#02050d] text-white"
        style={{
          filter: `brightness(${1 + eventPulse * 0.08}) saturate(${
            1 + eventPulse * 0.15
          })`,
          transition: "filter 0.6s ease",
        }}
      >
        {/* Base background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_65%)]" />

        {/* Ambient glow */}
        <div className="absolute left-[-150px] top-[-200px] h-[700px] w-[700px] rounded-full bg-blue-500/10 blur-[220px]" />
        <div className="absolute bottom-[-250px] right-[-150px] h-[650px] w-[650px] rounded-full bg-cyan-500/10 blur-[220px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,140,255,0.12),transparent_30%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(0,180,255,0.08),transparent_35%)]" />

        <Stars />

        <div className="relative z-10 flex min-h-screen">
          <Sidebar />

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 p-8"
          >
            <Header />

            <AnimatePresence mode="wait">
              {mode === "space" ? (
                <motion.div
                  key="space"
                  initial={{ opacity: 0, scale: 0.96, filter: "blur(12px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.03, filter: "blur(10px)" }}
                  transition={{ duration: 0.7 }}
                  className="relative h-[80vh] overflow-hidden rounded-[32px] border border-white/10 bg-black/20 backdrop-blur-sm"
                >
                  <Space />
                </motion.div>
              ) : (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                  transition={{ duration: 0.7 }}
                  className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                >
                  <WeatherCard />
                  <MusicCard />
                  <SystemCard />
                  <SystemLogCard />
                  <SignalTrackerCard />
                  <EnergyCoreCard />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        </div>
      </main>
    </>
  );
}
