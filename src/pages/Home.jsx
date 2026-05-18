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

      const events = [
  "📡 Deep space signal detected",
  "🛰 Satellite synchronized",
  "⚡ Energy core stabilized",
  "🌌 Nebula scan completed",
  "🚀 Navigation route updated",
  "🛸 Unknown object detected",
];

const randomEvent =
  events[Math.floor(Math.random() * events.length)];

addNotification(randomEvent);

    }, 15000);

    return () => clearInterval(interval);
  }, [drainBattery, addNotification]);

  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      {/* 🌌 BASE CLEAN BLUE THEME */}
      <div className="absolute inset-0 bg-[#02050d]" />


      {/* 🌠 soft radial depth (SEM roxo) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_65%)]" />

      {/* ✨ glows consistentes */}
      <div className="absolute top-[-200px] left-[-150px] w-[700px] h-[700px] bg-blue-500/10 blur-[220px] rounded-full" />
      <div className="absolute bottom-[-250px] right-[-150px] w-[650px] h-[650px] bg-cyan-500/10 blur-[220px] rounded-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,140,255,0.12),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(0,180,255,0.08),transparent_35%)]" />
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