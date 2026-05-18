import Card from "../ui/Card";
import { Radio } from "lucide-react";
import { useEffect, useState } from "react";

const SIGNALS = ["SIGNAL", "ECHO", "ANOMALY", "PING", "VOID"];

export default function SignalTrackerCard() {
  const [signal, setSignal] = useState("IDLE");

  useEffect(() => {
    const id = setInterval(() => {
      const random =
        SIGNALS[Math.floor(Math.random() * SIGNALS.length)];
      setSignal(random);
    }, 2000);

    return () => clearInterval(id);
  }, []);

  return (
    <Card className="h-80 flex flex-col justify-between border-purple-500/10">
      
      <div className="flex items-center gap-2">
        <Radio className="text-purple-400 animate-pulse" size={18} />
        <h2 className="text-white font-semibold">Signal Tracker</h2>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <span className="text-3xl text-purple-300 tracking-widest">
          {signal}
        </span>
      </div>

      <span className="text-xs text-white/40">
        deep-space signal monitor
      </span>
    </Card>
  );
}