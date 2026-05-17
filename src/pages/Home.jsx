import WeatherCard from "../components/dashboard/WeatherCard";
import MusicCard from "../components/dashboard/MusicCard";
import Card from "../components/ui/Card";
import Stars from "../components/space/StarsBackground";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import SystemCard from "../components/dashboard/SystemCard";
import { motion } from "framer-motion";
import { useUIStore } from "../state/uiStore";


export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#030712] text-white overflow-hidden">

      {/* gradiente base mais profundo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0b1020,#030712_60%)]" />

      {/* glow azul mais forte */}
      <div className="absolute top-[-200px] left-[-100px] w-[650px] h-[650px] bg-blue-600/20 blur-[180px] rounded-full" />

      {/* glow roxo mais vivo */}
      <div className="absolute bottom-[-250px] right-[-120px] w-[600px] h-[600px] bg-purple-600/25 blur-[200px] rounded-full" />

      {/* leve brilho central pra profundidade */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_60%)]" />

      <Stars />

      <div className="relative z-10 flex">

        <Sidebar />

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 p-8"
        >
          <Header />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <WeatherCard />
            <MusicCard />
            <SystemCard />
          </div>

        </motion.section>

      </div>
    </main>
  );
}