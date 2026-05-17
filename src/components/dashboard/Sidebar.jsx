import { useUIStore } from "../../state/uiStore";
import { LayoutDashboard, Orbit } from "lucide-react";

export default function Sidebar() {
  const { mode, setMode } = useUIStore();

  return (
    <aside className="
      w-64
      h-screen
      p-6
      border-r border-white/10
      bg-[#050816]/60
      backdrop-blur-xl
    ">

      <h1 className="text-white font-bold text-lg mb-8">
        Control Panel
      </h1>

      {/* DASHBOARD */}
      <button
        onClick={() => setMode("dashboard")}
        className={`
          flex items-center gap-3 w-full p-3 rounded-xl mb-3
          transition
          ${mode === "dashboard"
            ? "bg-blue-500/20 text-blue-300"
            : "text-white/60 hover:text-white hover:bg-white/5"}
        `}
      >
        <LayoutDashboard size={18} />
        Dashboard
      </button>

      {/* SPACE */}
      <button
        onClick={() => setMode("space")}
        className={`
          flex items-center gap-3 w-full p-3 rounded-xl
          transition
          ${mode === "space"
            ? "bg-purple-500/20 text-purple-300"
            : "text-white/60 hover:text-white hover:bg-white/5"}
        `}
      >
        <Orbit size={18} />
        Universe
      </button>

      {/* status visual simples */}
      <div className="mt-10 text-xs text-white/30">
        Mode: {mode}
      </div>

    </aside>
  );
}