import Card from "../ui/Card";
import { Zap } from "lucide-react";
import { useSystemStore } from "../../state/systemStore";

export default function EnergyCoreCard() {
  const cpu = useSystemStore((s) => s.cpu);
  const ram = useSystemStore((s) => s.ram);
  const battery = useSystemStore((s) => s.battery);
  const eventPulse = useSystemStore((s) => s.eventPulse);

  const energy =
    (cpu + ram + (100 - battery) + eventPulse * 100) / 4;

  return (
    <Card className="h-80 flex flex-col justify-between border-cyan-500/10">
      <div className="flex items-center gap-2">
        <Zap className="text-cyan-400" size={18} />
        <h2 className="text-white font-semibold">Energy Core</h2>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-32 h-32 rounded-full border border-cyan-400/20 flex items-center justify-center">
          
          <div
            className="absolute inset-0 rounded-full bg-cyan-400/10 blur-2xl"
            style={{
              opacity: energy / 100,
            }}
          />

          <span className="text-2xl text-white">
            {energy.toFixed(0)}%
          </span>
        </div>
      </div>

      <span className="text-xs text-white/40">
        system stability index
      </span>
    </Card>
  );
}