import { Search, Bell, Wifi, Battery } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formatted = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex items-center justify-between gap-6 mb-10">

      {/* SEARCH */}
      <div className="flex items-center gap-4 flex-1">

        <div className="relative flex-1 max-w-xl">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
          />

          <input
            type="text"
            placeholder="Search universe, system..."
            className="
              w-full h-14
              rounded-2xl
              bg-white/5
              border border-white/10
              pl-12 pr-4
              outline-none
              backdrop-blur-2xl
              text-white
              placeholder:text-white/30
              focus:border-blue-400/40
              focus:bg-white/10
              transition
            "
          />

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">

        {/* SYSTEM STATUS BOX (melhor que antes) */}
        <div className="
          hidden md:flex
          items-center gap-3
          h-14 px-4
          rounded-2xl
          bg-white/5
          border border-white/10
          backdrop-blur-2xl
          text-white/70
          text-sm
        ">
          <Wifi size={16} className="text-green-400" />
          Online
        </div>

        {/* TIME */}
        <div className="
          h-14 px-5
          rounded-2xl
          bg-white/5
          border border-white/10
          backdrop-blur-2xl
          flex items-center
          text-sm font-medium
          text-white/80
        ">
          {time}
        </div>

        {/* NOTIFICATION */}
        <button className="
          relative w-14 h-14
          rounded-2xl
          bg-white/5
          border border-white/10
          backdrop-blur-2xl
          flex items-center justify-center
          hover:bg-white/10
          transition
        ">
          <Bell size={20} />

          {/* dot de notificação */}
          <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* BATTERY / STATUS BOX NOVO (o quadrado que você queria mais útil) */}
        <div className="
          w-14 h-14
          rounded-2xl
          bg-gradient-to-br from-blue-500/20 to-purple-500/20
          border border-white/10
          backdrop-blur-2xl
          flex items-center justify-center
        ">
          <Battery size={18} className="text-white/70" />
        </div>

      </div>
    </header>
  );
}