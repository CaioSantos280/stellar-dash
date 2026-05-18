import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BOOT_MESSAGES = [
  "INITIALIZING ORBITAL SYSTEM",
  "CONNECTING SATELLITES",
  "CALIBRATING QUANTUM CORE",
  "SYNCING NEURAL NETWORK",
  "STABILIZING SPACE GRID",
];

export default function LoadingScreen({
  onFinish,
}) {
  const [progress, setProgress] = useState(0);

  const [messageIndex, setMessageIndex] =
    useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 18;

        if (next >= 100) {
          clearInterval(progressInterval);

          setTimeout(() => {
            onFinish();
          }, 500);

          return 100;
        }

        return next;
      });
    }, 220);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) =>
        prev < BOOT_MESSAGES.length - 1
          ? prev + 1
          : prev
      );
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: "blur(12px)",
        scale: 1.03,
      }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[999] overflow-hidden bg-[#02050d]"
    >

      {/* background glow */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_60%)]" />

      <div className="absolute left-[-200px] top-[-200px] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[180px]" />

      <div className="absolute bottom-[-250px] right-[-200px] h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[200px]" />



      {/* scanlines */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
        <div className="h-full w-full bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.12)_51%)] bg-[size:100%_4px]" />
      </div>



      {/* content */}

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">

        {/* logo */}

        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="mb-10"
        >
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/5 backdrop-blur-xl">

            <div className="h-16 w-16 rounded-full border border-cyan-300/40 bg-cyan-300/10 shadow-[0_0_60px_rgba(56,189,248,0.35)]" />

          </div>
        </motion.div>



        {/* title */}

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-center text-3xl font-semibold tracking-[0.35em] text-cyan-100"
        >
          STELLAR DASH
        </motion.h1>



        {/* current message */}

        <motion.p
          key={messageIndex}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
          }}
          className="mb-10 text-sm tracking-[0.3em] text-cyan-300/70"
        >
          {BOOT_MESSAGES[messageIndex]}
        </motion.p>



        {/* progress */}

        <div className="w-full max-w-[420px]">

          <div className="mb-3 flex items-center justify-between text-xs tracking-[0.25em] text-cyan-200/60">

            <span>SYSTEM BOOT</span>

            <span>
              {Math.floor(progress)}%
            </span>

          </div>



          <div className="h-[10px] overflow-hidden rounded-full border border-cyan-400/20 bg-white/5 backdrop-blur">

            <motion.div
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                ease: "easeOut",
              }}
              className="relative h-full rounded-full bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.9)]"
            >

              <div className="absolute right-0 top-0 h-full w-16 bg-white/40 blur-md" />

            </motion.div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}