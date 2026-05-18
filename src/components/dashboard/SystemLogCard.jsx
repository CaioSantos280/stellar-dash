import {
  Terminal,
  AlertTriangle,
  CheckCircle2,
  Radio,
} from "lucide-react";

import Card from "../ui/Card";

import {
  useEffect,
  useRef,
  useState,
} from "react";

const LOG_POOL = [
  {
    type: "ok",
    text: "Quantum core stabilized",
  },
  {
    type: "ok",
    text: "Navigation synced",
  },
  {
    type: "warn",
    text: "Minor fluctuation detected",
  },
  {
    type: "live",
    text: "Deep-space signal received",
  },
  {
    type: "ok",
    text: "Satellite uplink restored",
  },
  {
    type: "warn",
    text: "High GPU activity",
  },
  {
    type: "live",
    text: "Nebula scan completed",
  },
  {
    type: "ok",
    text: "System diagnostics complete",
  },
];

export default function SystemLogCard() {
  const [logs, setLogs] = useState([]);

  const scrollRef = useRef();
  

  useEffect(() => {
    const interval = setInterval(() => {
      const random =
        LOG_POOL[
          Math.floor(
            Math.random() * LOG_POOL.length
          )
        ];

      const newLog = {
        ...random,
        id: Date.now(),
        time: new Date().toLocaleTimeString(
          [],
          {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }
        ),
      };

      setLogs((prev) => [
        ...prev.slice(-7),
        newLog,
      ]);
    }, 1600);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTop =
      scrollRef.current.scrollHeight;
  }, [logs]);

  const getStyles = (type) => {
  switch (type) {
    case "ok":
      return {
        color:
          "text-sky-300",

        border:
          "border-sky-400/15",

        glow:
          "shadow-[0_0_22px_rgba(56,189,248,0.12)]",

        bg:
          "bg-sky-400/[0.03]",

        icon: (
          <CheckCircle2 size={14} />
        ),
      };

    case "warn":
      return {
        color:
          "text-rose-300",

        border:
          "border-rose-400/15",

        glow:
          "shadow-[0_0_22px_rgba(244,63,94,0.12)]",

        bg:
          "bg-rose-400/[0.03]",

        icon: (
          <AlertTriangle size={14} />
        ),
      };

    default:
      return {
        color:
          "text-violet-300",

        border:
          "border-violet-400/15",

        glow:
          "shadow-[0_0_22px_rgba(167,139,250,0.12)]",

        bg:
          "bg-violet-400/[0.03]",

        icon: (
          <Radio
            size={14}
            className="animate-pulse"
          />
        ),
      };
  }
};

  return (
    <Card className="h-80 flex flex-col overflow-hidden">

      {/* HEADER */}

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <Terminal
            size={18}
            className="text-cyan-400"
          />

          <h2 className="font-semibold text-white">
            System Feed
          </h2>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-cyan-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
          Live
        </div>

      </div>

      {/* LOG AREA */}

      <div
        ref={scrollRef}
        className="flex-1 space-y-3 overflow-y-auto pr-1 font-mono text-xs"
      >

        {logs.map((log) => {
          const styles =
            getStyles(log.type);

          return (
            <div
              key={log.id}
              className={`
  group
  relative
  overflow-hidden
  rounded-xl
  border
  p-3
  backdrop-blur-md
  transition-all
  duration-500
  hover:bg-white/[0.05]
  ${styles.border}
  ${styles.glow}
  ${styles.bg}
`}
            >

              {/* glow line */}

              <div
                className={`
                  absolute
                  left-0
                  top-0
                  h-full
                  w-[2px]
                  ${styles.color}
                  bg-current
                `}
              />

              <div className="mb-1 flex items-center justify-between">

                <div
                  className={`flex items-center gap-2 ${styles.color}`}
                >
                  {styles.icon}

                  <span className="uppercase tracking-wider">
                    {log.type}
                  </span>
                </div>

                <span className="text-[10px] text-white/30">
                  {log.time}
                </span>

              </div>

              <p className="text-white/70">
                {log.text}
              </p>

            </div>
          );
        })}

      </div>

      {/* FOOTER */}

      <div className="mt-4 flex items-center justify-between text-[11px] text-white/30">

        <span>
          realtime telemetry feed
        </span>

        <span className="text-cyan-400/70">
          SYS.LOG
        </span>

      </div>

      <style>
        {`
          @keyframes logEnter {
            from {
              opacity: 0;
              transform: translateY(10px) scale(0.98);
              filter: blur(8px);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
              filter: blur(0px);
            }
          }
        `}
      </style>

    </Card>
  );
}