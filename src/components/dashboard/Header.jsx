import {
  Search,
  Bell,
} from "lucide-react";
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
    <header className="
      flex
      items-center
      justify-between
      gap-6
      mb-10
    ">

      <div className="
        flex
        items-center
        gap-4
        flex-1
      ">

        <div className="
          relative
          flex-1
          max-w-xl
        ">

          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-white/40
            "
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              w-full
              h-14
              rounded-2xl
              bg-white/5
              border
              border-white/10
              pl-12
              pr-4
              outline-none
              backdrop-blur-xl
              text-white
              placeholder:text-white/30
              focus:border-blue-400/40
              transition
            "
          />

        </div>

      </div>

      <div className="
        flex
        items-center
        gap-4
      ">

        <div className="
          h-14
          px-6
          rounded-2xl
          bg-white/5
          border
          border-white/10
          flex
          items-center
          justify-center
          text-lg
          font-medium
          backdrop-blur-xl
        ">
          {time}
        </div>

        <button className="
          w-14
          h-14
          rounded-2xl
          bg-white/5
          border
          border-white/10
          flex
          items-center
          justify-center
          hover:bg-blue-500/20
          transition
        ">
          <Bell size={20} />
        </button>

        <div className="
          w-14
          h-14
          rounded-2xl
          bg-gradient-to-br
          from-blue-400
          to-purple-500
          border
          border-white/20
        " />

      </div>

    </header>
  );
}