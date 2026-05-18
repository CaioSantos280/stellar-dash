import { motion } from "framer-motion";

export default function Card({ children, className = "" }) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.04,
        rotateX: 2,
        rotateY: -2,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 18,
      }}
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-[#081120]/80
        backdrop-blur-2xl
        p-6
        shadow-[0_20px_80px_rgba(0,0,0,0.6)]
        transform-gpu
        ${className}
      `}
    >
      {/* glow interno dinâmico */}
      <div className="
        absolute -inset-20
        bg-gradient-to-r
        from-cyan-500/10
        via-blue-500/5
        to-transparent
        blur-3xl
        opacity-60
      " />

      {/* highlight superior (efeito vidro) */}
      <div className="
        absolute inset-0
        bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_60%)]
      " />

      {/* borda brilhante suave */}
      <div className="
        absolute inset-0
        rounded-3xl
        border border-white/10
      " />

      {/* conteúdo */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}