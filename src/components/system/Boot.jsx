import { useEffect, useState } from "react";

export default function Boot({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 500);
          return 100;
        }
        return p + 3;
      });
    }, 50);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center text-white z-50">
      <div className="text-center">
        <p className="text-blue-300 mb-4 tracking-widest">
          INITIALIZING STELLAR SYSTEM
        </p>

        <div className="w-72 h-[2px] bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-3 text-white/40 text-xs">
          {progress}%
        </p>
      </div>
    </div>
  );
}