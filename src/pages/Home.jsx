import WeatherCard from "../components/dashboard/WeatherCard";
import MusicCard from "../components/dashboard/MusicCard";
import SystemCard from "../components/dashboard/SystemCard";
import SystemLogCard from "../components/dashboard/SystemLogCard";

import Stars from "../components/space/StarsBackground";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import Space from "./Space";

import { useEffect } from "react";
import { useSystemStore } from "../state/systemStore";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "../state/uiStore";

export default function Home() {
  const { mode } = useUIStore();

  const {
    initSystem,
    drainBattery,
    addNotification,
  } = useSystemStore();

  useEffect(() => {
    initSystem();
  }, [initSystem]);

  useEffect(() => {
    const interval = setInterval(() => {
      drainBattery();

      const current = useSystemStore.getState().battery;

      if (current === 50) addNotification("⚠ Battery mid level");
      if (current === 20) addNotification("🔴 Critical energy");

    }, 8000);

    return () => clearInterval(interval);
  }, [drainBattery, addNotification]);

  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      {/* 🌌 BASE CLEAN BLUE THEME */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04060c] via-[#050a18] to-black" />

      {/* 🌠 soft radial depth (SEM roxo) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_65%)]" />

      {/* ✨ glows consistentes */}
      <div className="absolute top-[-200px] left-[-150px] w-[700px] h-[700px] bg-blue-500/10 blur-[220px] rounded-full" />
      <div className="absolute bottom-[-250px] right-[-150px] w-[650px] h-[650px] bg-cyan-500/10 blur-[220px] rounded-full" />

      <Stars />

      <div className="relative z-10 flex">
        <Sidebar />

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 p-8"
        >
          <Header />

          <AnimatePresence mode="wait">
            {mode === "space" ? (
              <motion.div
                key="space"
                className="h-[80vh] relative"
              >
                <Space />
              </motion.div>
            ) : (
              <motion.div
                key="dashboard"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                <WeatherCard />
                <MusicCard />
                <SystemCard />
                <SystemLogCard />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      </div>
    </main>
  );
}