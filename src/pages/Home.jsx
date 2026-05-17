import WeatherCard from "../components/dashboard/WeatherCard";
import MusicCard from "../components/dashboard/MusicCard";
import SystemCard from "../components/dashboard/SystemCard";
import Stars from "../components/space/StarsBackground";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import Space from "./Space";
import SystemLogCard from "../components/dashboard/SystemLogCard";

import { useEffect } from "react";
import { useSystemStore } from "../state/systemStore";
import { motion, AnimatePresence } from "framer-motion";
import { useUIStore } from "../state/uiStore";
import { playHoverSound } from "../utils/sound";

export default function Home() {
  const { mode } = useUIStore();

  // 🔊 inicializa som UMA vez
  useEffect(() => {
    playHoverSound();
  }, []);
  const { drainBattery, addNotification, battery } = useSystemStore();

useEffect(() => {
  const interval = setInterval(() => {
    drainBattery();

    if (battery === 50) {
      addNotification("⚠ Battery reaching mid level");
    }

    if (battery === 20) {
      addNotification("🔴 Critical energy level");
    }
  }, 8000);

  return () => clearInterval(interval);
}, [battery]);

  return (
    <main className="relative min-h-screen text-white overflow-hidden">

      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#040611] via-[#050816] to-black" />

      {/* ✨ GLOWS */}
      <div className="absolute top-[-200px] left-[-150px] w-[700px] h-[700px] bg-blue-600/15 blur-[200px] rounded-full" />
      <div className="absolute bottom-[-250px] right-[-150px] w-[650px] h-[650px] bg-purple-600/15 blur-[220px] rounded-full" />

      {/* 🌠 DEPTH */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_65%)]" />

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

          {/* 🌌 TRANSIÇÃO ENTRE MODOS */}
          <AnimatePresence mode="wait">

            {mode === "space" ? (
              <motion.div
                key="space"
                initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                transition={{ duration: 0.6 }}
                className="h-[80vh] relative"
              >
                <Space />
              </motion.div>

            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
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