import { Activity, Cpu, MemoryStick, Wifi } from "lucide-react";
import Card from "../ui/Card";
import { useEffect, useState } from "react";

export default function SystemCard() {
  const [cpu, setCpu] = useState(0);
  const [ram, setRam] = useState(0);
  const [net, setNet] = useState(0);

  // simulação leve (depois pode virar real com performance API)
  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(20 + Math.random() * 60));
      setRam(Math.floor(30 + Math.random() * 50));
      setNet(Math.floor(10 + Math.random() * 80));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const Bar = ({ value, color }) => (
    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
      <div
        className={`h-full transition-all duration-700 ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );

  return (
    <Card className="h-80">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Activity className="text-blue-400" size={18} />
          <h2 className="text-white font-semibold">System Monitor</h2>
        </div>

        <span className="text-xs text-green-400">LIVE</span>
      </div>

      {/* CPU */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-white/60 mb-1">
          <span className="flex items-center gap-2">
            <Cpu size={14} /> CPU
          </span>
          <span>{cpu}%</span>
        </div>
        <Bar value={cpu} color="bg-blue-500" />
      </div>

      {/* RAM */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-white/60 mb-1">
          <span className="flex items-center gap-2">
            <MemoryStick size={14} /> RAM
          </span>
          <span>{ram}%</span>
        </div>
        <Bar value={ram} color="bg-purple-500" />
      </div>

      {/* NETWORK */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-white/60 mb-1">
          <span className="flex items-center gap-2">
            <Wifi size={14} /> Network
          </span>
          <span>{net} ms</span>
        </div>
        <Bar value={Math.min(net, 100)} color="bg-cyan-400" />
      </div>

      {/* FOOTER STATUS */}
      <div className="flex items-center justify-between text-xs text-white/30">
        <span>System stable</span>
        <span className="text-white/40">v1.0</span>
      </div>

    </Card>
  );
}