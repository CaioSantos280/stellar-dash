import { Search, Bell, Battery } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSystemStore } from "../../state/systemStore";

export default function Header() {
  const battery = useSystemStore((s) => s.battery);
  const cpu = useSystemStore((s) => s.cpu);
  const eventPulse = useSystemStore((s) => s.eventPulse);
  const notifications = useSystemStore((s) => s.notifications);

  const [time, setTime] = useState("");
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const stress = Math.min(1, (cpu + (100 - battery)) / 200);

  return (
    <header
      className="
        relative flex items-center justify-between
        mb-10 px-5 py-4
        rounded-2xl
        border border-white/10
        backdrop-blur-2xl
        overflow-hidden
      "
      style={{
        background: `rgba(255,255,255,${0.04 + stress * 0.03})`,
        boxShadow: `0 0 ${30 + stress * 40}px rgba(0,150,255,${0.08 + stress * 0.2})`,
      }}
    >
      {/* ENERGY BACKGROUND FIELD */}
      <div
        className="
          absolute inset-0 pointer-events-none
          bg-[radial-gradient(circle_at_left,rgba(0,140,255,0.08),transparent_60%)]
        "
        style={{
          opacity: 0.3 + eventPulse * 0.4,
        }}
      />

      {/* LEFT - SEARCH HUD */}
      <div
        className={`
          relative flex items-center w-full max-w-md
          transition-all duration-300
          ${focus ? "scale-[1.02]" : ""}
        `}
      >
        <Search
          size={16}
          className={`absolute left-3 transition ${
            focus ? "text-cyan-300" : "text-white/40"
          }`}
        />

        <input
          type="text"
          placeholder="Search system / signals / universe..."
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="
            w-full bg-white/5
            border border-white/10
            rounded-xl
            pl-9 pr-3 py-2
            text-white
            outline-none
            placeholder:text-white/30
            transition
          "
        />

        {/* scanning line */}
        {focus && (
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-cyan-400"
            animate={{ width: ["0%", "100%"] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        )}
      </div>

      {/* RIGHT HUD */}
      <div className="flex items-center gap-3">

        {/* TIME CORE */}
        <div
          className="
            relative h-10 px-4
            flex items-center
            rounded-xl
            border border-white/10
            bg-white/5
            font-mono text-sm text-white/70
            overflow-hidden
          "
        >
          <motion.div
            className="absolute inset-0 bg-cyan-400/10"
            animate={{ opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          <span className="relative z-10">{time}</span>
        </div>

        {/* BATTERY CORE */}
        <div
          className="
            relative w-11 h-10
            rounded-xl
            border border-white/10
            flex items-center justify-center
            overflow-hidden
          "
        >
          <div
            className={`absolute inset-0 transition ${
              battery > 50
                ? "bg-blue-500/10"
                : "bg-red-500/10"
            }`}
          />

          <Battery
            size={16}
            className={
              battery < 20 ? "text-red-400" : "text-white/70"
            }
          />

          {/* mini bar */}
          <div className="absolute bottom-1 left-2 right-2 h-[2px] bg-white/10 rounded">
            <div
              className={`h-full transition-all ${
                battery < 20 ? "bg-red-400" : "bg-cyan-400"
              }`}
              style={{ width: `${battery}%` }}
            />
          </div>
        </div>

        {/* NOTIFICATIONS CORE */}
        <button
          className="
            relative w-10 h-10
            rounded-xl
            bg-white/5
            border border-white/10
            flex items-center justify-center
            hover:bg-white/10
            transition
            overflow-hidden
          "
        >
          <Bell size={18} />

          {notifications.length > 0 && (
            <>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping" />

              <span className="absolute bottom-1 right-1 text-[10px] text-red-300">
                {notifications.length}
              </span>
            </>
          )}
        </button>

      </div>
    </header>
  );
}