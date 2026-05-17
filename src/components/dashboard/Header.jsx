import { Search, Bell, Battery } from "lucide-react";
import { useEffect, useState } from "react";
import { useSystemStore } from "../../state/systemStore";

export default function Header() {
  const { battery, notifications } = useSystemStore();

  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="
      flex items-center justify-between
      mb-10 px-4 py-3
      rounded-2xl
      bg-white/5
      border border-white/10
      backdrop-blur-2xl
    ">

      {/* LEFT - SEARCH */}
      <div className="relative w-full max-w-md">

        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
        />

        <input
          type="text"
          placeholder="Search system, universe..."
          className="
            w-full
            bg-transparent
            pl-9 pr-3
            outline-none
            text-white
            placeholder:text-white/30
          "
        />

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">

        {/* TIME */}
        <div className="
          h-10 px-4
          rounded-xl
          bg-white/5
          border border-white/10
          backdrop-blur-2xl
          flex items-center
          text-sm font-mono
          text-white/70
        ">
          {time}
        </div>

        {/* BATTERY */}
        <div className={`
          w-10 h-10
          rounded-xl
          border border-white/10
          flex items-center justify-center
          transition
          ${battery > 50 ? "bg-blue-500/10" : "bg-red-500/10"}
        `}>
          <Battery size={16} className="text-white/70" />
        </div>

        {/* NOTIFICATIONS (AGORA REAL) */}
        <button className="
          relative w-10 h-10
          rounded-xl
          bg-white/5
          border border-white/10
          flex items-center justify-center
          hover:bg-white/10
          transition
        ">
          <Bell size={18} />

          {notifications > 0 && (
            <span className="
              absolute top-2 right-2
              w-2 h-2 bg-red-500
              rounded-full animate-pulse
            " />
          )}
        </button>

      </div>

    </header>
  );
}