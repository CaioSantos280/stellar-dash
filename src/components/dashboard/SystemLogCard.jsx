import { Terminal } from "lucide-react";
import Card from "../ui/Card";
import { useEffect, useState } from "react";

export default function SystemLogCard() {
  const [logs, setLogs] = useState([]);

  const baseLogs = [
    "[OK] System initialized",
    "[OK] UI engine loaded",
    "[OK] Space module synced",
    "[OK] Audio subsystem online",
    "[WARN] GPU load fluctuating",
  ];

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setLogs((prev) => {
        if (index >= baseLogs.length) {
          index = 0;
          return prev;
        }

        const next = [...prev, baseLogs[index]];
        index++;
        return next.slice(-6); // mantém só últimas linhas
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="h-80 flex flex-col">

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-4">
        <Terminal size={18} className="text-green-400" />
        <h2 className="text-white font-semibold">System Log</h2>
      </div>

      {/* LOG AREA */}
      <div className="flex-1 overflow-hidden font-mono text-xs space-y-2 text-white/70">

        {logs.map((log, i) => (
          <div
            key={i}
            className="opacity-0 animate-[fadeIn_0.3s_ease_forwards]"
            style={{
              animationDelay: `${i * 50}ms`,
            }}
          >
            {log}
          </div>
        ))}

      </div>

      {/* FOOTER */}
      <div className="text-xs text-white/30 mt-2">
        live system feed
      </div>

      {/* animação simples inline */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

    </Card>
  );
}