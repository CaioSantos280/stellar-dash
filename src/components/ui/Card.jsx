import { motion } from "framer-motion";

export default function Card({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.03,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
        damping: 18,
      }}
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-[#0f1729]/80
        backdrop-blur-xl
        p-6
        shadow-2xl
        ${className}
      `}
    >
      {/* glow mais leve (não mata contraste) */}
      <div className="
        absolute inset-0
        rounded-3xl
        bg-blue-500/5
        opacity-60
      " />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}