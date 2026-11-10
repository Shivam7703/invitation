"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ganesha, topright, bottomleft } from "@/assets";

const shadow = "drop-shadow-[0_12px_24px_rgba(0,0,0,0.65)]";

export default function Banner() {
  const reduce = useReducedMotion();

  // mouse position (-1 to 1) -> smooth spring
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 15 });
  const sy = useSpring(my, { stiffness: 80, damping: 15 });

  // sirf border/corner images ke liye (opposite direction = depth feel)
  const cornerX = useTransform(sx, [-1, 1], [-20, 20]);
  const cornerY = useTransform(sy, [-1, 1], [-14, 14]);
  const cornerXRev = useTransform(sx, [-1, 1], [20, -20]);
  const cornerYRev = useTransform(sy, [-1, 1], [14, -14]);

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#5e1224] via-[#3a0a16] to-[#1a0509]"
    >
      {/* ---------- CORNER FLOWERS (mouse effect yahin) ---------- */}
      <motion.div
        style={reduce ? undefined : { x: cornerX, y: cornerY }}
        className="pointer-events-none absolute right-[-5%] top-[-5%] z-20 w-full md:w-[50vw]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: 12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 1 },
            scale: { duration: 1.2 },
            rotate: { duration: 1.2 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ transformOrigin: "top right" }}
        >
          <Image src={topright} alt="" className={`w-full ${shadow}`} />
        </motion.div>
      </motion.div>

      <motion.div
        style={reduce ? undefined : { x: cornerXRev, y: cornerYRev }}
        className="pointer-events-none absolute bottom-[-5%] left-[-5%] z-20 w-[80vw] md:w-[50vw]"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0, y: [0, 8, 0] }}
          transition={{
            opacity: { duration: 1 },
            scale: { duration: 1.2 },
            rotate: { duration: 1.2 },
            y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ transformOrigin: "bottom left" }}
        >
          <Image src={bottomleft} alt="" className={`w-full ${shadow}`} />
        </motion.div>
      </motion.div>

      {/* ---------- CENTER CONTENT (no tilt) ---------- */}
      <div className="relative z-30 flex min-h-screen items-center justify-center px-6 py-16 sm:px-14">
        
        <div className="flex flex-col items-center text-center">
          {/* Ganesha + moving circles */}
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-36 w-36 sm:h-44 sm:w-44"
          >
            {/* soft glow */}
            <motion.div
              className="absolute inset-4 rounded-full bg-[#c9a36a]/30 blur-2xl"
              animate={{ opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* outer dashed ring (clockwise) */}
            <motion.div
              className="absolute inset-0 rounded-full border border-dashed border-[#c9a36a]/70 shadow-[0_0_25px_rgba(201,163,106,0.35)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#e6c78f] shadow-[0_0_14px_#e6c78f]" />
            </motion.div>
            {/* inner ring (anti-clockwise) */}
            <motion.div
              className="absolute inset-3 rounded-full border border-[#c9a36a]/40"
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#f3e6d3] shadow-[0_0_10px_#f3e6d3]" />
            </motion.div>
            {/* Ganesha */}
            <motion.div
              className="absolute inset-0 grid place-items-center"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
            <Image
  src={ganesha}
  alt="Lord Ganesha"
  className={`h-20 w-20 object-contain brightness-0 invert sm:h-24 sm:w-24 ${shadow}`}
  priority
/>
            </motion.div>
          </motion.div>
  <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5, duration: 1 }}
  className="mt-5 text-base text-[#e6c78f] sm:text-xl"
  style={{ textShadow: "0 6px 18px rgba(0,0,0,0.55)" }}
>
  ॐ श्री गणेशाय नमः
</motion.p>
          <p className="mt-10 text-[11px] tracking-[0.3em] text-[#f3e6d3]/80">
            TOGETHER WITH THEIR FAMILIES
          </p>

          {/* Names: ek hi line, bold */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-6 flex items-baseline justify-center gap-3 whitespace-nowrap font-heading text-3xl font-bold leading-none tracking-[0.06em] text-[#c9a36a] sm:gap-5 sm:text-6xl md:text-7xl"
            style={{ textShadow: "0 8px 24px rgba(0,0,0,0.55)" }}
          >
            <span>NIKHIL</span>
            <span className="text-xl font-medium italic tracking-normal text-[#e6c78f]/80 sm:text-4xl">
              and
            </span>
            <span>RITIKA</span>
          </motion.h1>

          <p className="mt-8 text-[11px] tracking-[0.3em] text-[#f3e6d3]/80">
            INVITE YOU TO CELEBRATE THEIR WEDDING
          </p>

          <div className="mt-6 flex items-center gap-4 font-heading text-[#c9a36a]">
            <span className="text-lg tracking-widest">FEB</span>
            <span className="h-8 w-px bg-[#c9a36a]/60" />
            <span className="text-5xl font-light">04</span>
            <span className="h-8 w-px bg-[#c9a36a]/60" />
            <span className="text-lg tracking-widest">2027</span>
          </div>
          <p className="mt-3 text-xs tracking-[0.2em] text-[#f3e6d3]/80">
            THURSDAY | 6:00 PM ONWARDS
          </p>
        </div>
      </div>
    </section>
  );
}