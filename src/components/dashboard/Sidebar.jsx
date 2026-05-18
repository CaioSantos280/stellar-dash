import { useUIStore } from "../../state/uiStore";
import { LayoutDashboard, Orbit } from "lucide-react";
import { playHoverSound } from "../../utils/sound";

export default function Sidebar() {
  const { mode, setMode } = useUIStore();

  const Button = ({ active, onClick, icon: Icon, label }) => {
    const isDashboard = label === "Dashboard";

    const handleClick = () => {
      playHoverSound();
      onClick();
    };

    return (
      <button
        onClick={handleClick}
        className={`
          relative flex items-center gap-3 p-3 rounded-xl transition overflow-hidden
          ${active ? "text-white" : "text-white/30 hover:text-white"}
        `}
      >
        {/* glow ativo */}
        {active && (
          <span
            className={`
              absolute inset-0 opacity-20 animate-pulse rounded-xl
              ${isDashboard ? "bg-blue-500" : "bg-purple-600"}
            `}
          />
        )}

        {/* linha de energia lateral */}
        {active && (
          <span
            className={`
              absolute left-0 top-2 bottom-2 w-[2px] rounded-full
              ${isDashboard ? "bg-blue-500" : "bg-purple-600"}
            `}
          />
        )}

        {/* pulso */}
        {active && (
          <span className="absolute left-3 w-2 h-2 rounded-full bg-white animate-ping opacity-40" />
        )}

        <Icon size={18} />
        <span className="relative z-10">{label}</span>
      </button>
    );
  };

  return (
    <aside className="
-  relative w-64 h-screen p-6
+  relative w-64 h-screen p-6 z-50
   bg-[#00040c]/95
   backdrop-blur-3xl
   border-r border-white/5
   flex flex-col
   overflow-hidden
">

      {/* deep space layer */}
      <div className="
        absolute inset-0
        bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.85),transparent_70%)]
        pointer-events-none
      " />

      {/* faint nebula */}
      <div className="
        absolute inset-0
        bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.05),transparent_70%)]
        pointer-events-none
      " />

      <div className="relative z-10">

        <h1 className="text-white/80 font-bold mb-10 tracking-widest">
          STELLAR DASH
        </h1>

        <div className="flex flex-col gap-2">

          <Button
            active={mode === "dashboard"}
            onClick={() => setMode("dashboard")}
            icon={LayoutDashboard}
            label="Dashboard"
          />

          <Button
            active={mode === "space"}
            onClick={() => setMode("space")}
            icon={Orbit}
            label="Universe"
          />

        </div>
      </div>

      {/* footer status */}
      <div className="relative z-10 mt-auto text-xs text-white/20 space-y-3">

        <div className="flex items-center justify-between">
          <span>SYSTEM</span>
          <span className="text-green-400">ONLINE</span>
        </div>

        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-gradient-to-r from-blue-500/60 to-cyan-500/60" />
        </div>

      </div>

    </aside>
  );
}