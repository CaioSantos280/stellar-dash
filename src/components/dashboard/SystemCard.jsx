import { useEffect, useState } from "react";
import Card from "../ui/Card";

export default function SystemCard() {
  const [cpu, setCpu] = useState(0);
  const [ram, setRam] = useState(0);
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // simulação realista
      setCpu(Math.floor(20 + Math.random() * 60));
      setRam(Math.floor(30 + Math.random() * 50));
      setOnline(navigator.onLine);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-64">
      <p className="text-white/50 text-sm mb-4">
        System Status
      </p>

      {/* CPU */}
      <div className="mb-4">
        <div className="flex justify-between text-sm">
          <span>CPU Usage</span>
          <span>{cpu}%</span>
        </div>

        <div className="w-full h-2 bg-white/10 rounded-full mt-1 overflow-hidden">
          <div
            className="h-full bg-blue-400 transition-all duration-700"
            style={{ width: `${cpu}%` }}
          />
        </div>
      </div>

      {/* RAM */}
      <div className="mb-4">
        <div className="flex justify-between text-sm">
          <span>RAM Usage</span>
          <span>{ram}%</span>
        </div>

        <div className="w-full h-2 bg-white/10 rounded-full mt-1 overflow-hidden">
          <div
            className="h-full bg-purple-400 transition-all duration-700"
            style={{ width: `${ram}%` }}
          />
        </div>
      </div>

      {/* STATUS */}
      <div className="flex items-center justify-between mt-6">
        <span className="text-white/40 text-sm">
          Network
        </span>

        <span
          className={
            online ? "text-green-400 text-sm" : "text-red-400 text-sm"
          }
        >
          {online ? "Online" : "Offline"}
        </span>
      </div>
    </Card>
  );
}