import {
  Activity,
  Cpu,
  MemoryStick,
  Wifi,
  Battery,
} from "lucide-react";

import Card from "../ui/Card";
import { motion } from "framer-motion";
import { useSystemStore } from "../../state/systemStore";

export default function SystemCard() {
  const cpu = useSystemStore((s) => s.cpu);
  const ram = useSystemStore((s) => s.ram);
  const network = useSystemStore((s) => s.network);
  const battery = useSystemStore((s) => s.battery);
  const eventPulse = useSystemStore((s) => s.eventPulse);

  const isCritical =
    battery < 20 || cpu > 90 || ram > 90;

  const Bar = ({ value, color }) => (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        animate={{
          width: `${value}%`,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className={`h-full rounded-full ${color}`}
      />
    </div>
  );

  return (
    <Card
      className={`
        h-80 transition-all duration-500

        ${
          isCritical
            ? "border-red-500/40 shadow-[0_0_50px_rgba(239,68,68,0.18)]"
            : "border-cyan-500/10"
        }

        ${
          eventPulse > 0.7
            ? "scale-[1.015]"
            : "scale-100"
        }
      `}
    >
      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity
            className={
              isCritical
                ? "text-red-400"
                : "text-cyan-400"
            }
            size={18}
          />

          <h2 className="font-semibold text-white">
            System Monitor
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <div
            className={`
              h-2 w-2 rounded-full animate-pulse
              ${
                isCritical
                  ? "bg-red-400"
                  : "bg-cyan-400"
              }
            `}
          />

          <span
            className={`
              text-xs tracking-[0.25em]
              ${
                isCritical
                  ? "text-red-400"
                  : "text-cyan-400"
              }
            `}
          >
            LIVE
          </span>
        </div>
      </div>

      {/* CPU */}
      <Metric
        icon={<Cpu size={14} />}
        label="CPU"
        value={cpu}
        barColor={cpu > 85 ? "bg-red-500" : "bg-blue-500"}
      />

      {/* RAM */}
      <Metric
        icon={<MemoryStick size={14} />}
        label="RAM"
        value={ram}
        barColor={ram > 85 ? "bg-red-500" : "bg-cyan-400"}
      />

      {/* NETWORK (corrigido visualmente) */}
      <Metric
        icon={<Wifi size={14} />}
        label="NETWORK"
        value={Math.min(network, 100)}
        suffix="ms"
        barColor="bg-sky-400"
      />

      {/* BATTERY */}
      <Metric
        icon={<Battery size={14} />}
        label="POWER CELL"
        value={battery}
        barColor={battery < 20 ? "bg-red-500" : "bg-emerald-400"}
      />

      {/* FOOTER */}
      <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs">
        <span
          className={
            isCritical ? "text-red-400" : "text-white/40"
          }
        >
          {isCritical
            ? "Critical system load"
            : "All systems operational"}
        </span>

        <span className="text-white/30">
          SYS v2.5.0
        </span>
      </div>
    </Card>
  );
}

/* ---------------- COMPONENT AUXILIAR ---------------- */

function Metric({
  icon,
  label,
  value,
  barColor,
  suffix = "%",
}) {
  return (
    <div className="mb-5">
      <div className="mb-1 flex items-center justify-between text-xs text-white/60">
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>

        <span>
          {value.toFixed(0)}
          {suffix}
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6 }}
          className={`h-full rounded-full ${barColor}`}
        />
      </div>
    </div>
  );
}