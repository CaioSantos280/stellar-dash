import { useUIStore } from "../../state/uiStore";
import { useSystemStore } from "../../state/systemStore";
import { LayoutDashboard, Orbit } from "lucide-react";
import { motion } from "framer-motion";
import { playHoverSound } from "../../utils/sound";

export default function Sidebar() {
  const mode = useUIStore((s) => s.mode);
  const setMode = useUIStore((s) => s.setMode);

  const cpu = useSystemStore((s) => s.cpu);
  const battery = useSystemStore((s) => s.battery);
  const eventPulse = useSystemStore((s) => s.eventPulse);

  const systemStress = Math.min(1, (cpu + (100 - battery)) / 200);

  const Button = ({ active, onClick, icon: Icon, label, accent }) => {
    const handleClick = () => {
      playHoverSound();
      onClick();
    };

    return (
      <button
        onClick={handleClick}
        className={`
          relative flex items-center gap-3 px-4 py-3 rounded-xl
          transition-all duration-300 overflow-hidden group
          ${active ? "text-white" : "text-white/40 hover:text-white"}
        `}
      >
        {/* ENERGY BACKGROUND */}
        <span
          className={`
            absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
            transition-all duration-300
            ${accent}
          `}
        />

        {/* ACTIVE GLOW PULSE */}
        {active && (
          <motion.span
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className={`
              absolute inset-0 rounded-xl blur-xl
              ${accent}
            `}
          />
        )}

        {/* LEFT ENERGY BAR */}
        <span
          className={`
            absolute left-0 top-2 bottom-2 w-[2px] rounded-full
            transition-all duration-300
            ${active ? "bg-white/70" : "bg-transparent"}
          `}
        />

        <Icon size={18} />
        <span className="relative z-10 text-sm tracking-wide">
          {label}
        </span>
      </button>
    );
  };

  return (
    <aside
      className="
        relative w-64 h-screen p-6 z-50
        bg-[#00040c]/95 backdrop-blur-3xl
        border-r border-white/5
        flex flex-col overflow-hidden
      "
    >
      {/* BACKGROUND ENERGY FIELD */}
      <div
        className="
          absolute inset-0 pointer-events-none
          bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.85),transparent_70%)]
        "
        style={{
          filter: `blur(${8 + systemStress * 10}px)`,
        }}
      />

      <div className="relative z-10">
        {/* TITLE */}
        <div className="mb-8">
          <h1 className="text-white font-bold tracking-[0.3em] text-sm">
            STELLAR CORE
          </h1>

          <div className="text-xs text-white/30 mt-1">
            {mode.toUpperCase()} MODE
          </div>
        </div>

        {/* NAV */}
        <div className="flex flex-col gap-2">
          <Button
            active={mode === "dashboard"}
            onClick={() => setMode("dashboard")}
            icon={LayoutDashboard}
            label="Dashboard"
            accent="bg-blue-500/10"
          />

          <Button
            active={mode === "space"}
            onClick={() => setMode("space")}
            icon={Orbit}
            label="Space"
            accent="bg-purple-500/10"
          />
        </div>
      </div>

      {/* STATUS PANEL */}
      <div className="relative z-10 mt-auto space-y-4">
        <div className="text-xs text-white/30 flex justify-between">
          <span>SYSTEM LOAD</span>
          <span
            className={
              systemStress > 0.7
                ? "text-red-400"
                : "text-green-400"
            }
          >
            {Math.round(systemStress * 100)}%
          </span>
        </div>

        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
            animate={{ width: `${systemStress * 100}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>

        <div className="flex justify-between text-[10px] text-white/20">
          <span>CPU {Math.round(cpu)}%</span>
          <span>BATT {Math.round(battery)}%</span>
        </div>
      </div>
    </aside>
  );
}