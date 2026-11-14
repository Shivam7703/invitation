"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cpl, side } from "@/assets";
import { inviteData } from "@/component/data";

function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c9a36a]" />
      <span className="h-2 w-2 rotate-45 border border-[#c9a36a] bg-[#c9a36a]/40" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c9a36a]" />
    </div>
  );
}

export default function Invite() {
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#3a0a16] via-[#4a0d1c] to-[#1a0509] pt-28 text-[#f3e6d3]">
      {/* ---------- SIDE ORNAMENT 1 ---------- */}
      <motion.div
        initial={{ opacity: 0, x: reduce ? 0 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        animate={reduce ? undefined : { y: [0, -12, 0] }}
        transition={{
          opacity: { duration: 1 },
          x: { duration: 1.2, ease },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="pointer-events-none absolute bottom-[-14%] left-[9%] z-30 w-56 sm:bottom-[-28%] sm:w-70"
      >
        <Image
          src={side}
          alt=""
          className="h-max w-full -rotate-[65deg] scale-x-[-1] object-contain drop-shadow-[0_22px_24px_rgba(0,0,0,0.6)]"
        />
      </motion.div>

      {/* ---------- SIDE ORNAMENT 2 ---------- */}
      <motion.div
        initial={{ opacity: 0, x: reduce ? 0 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        animate={reduce ? undefined : { y: [0, 10, 0] }}
        transition={{
          opacity: { duration: 1, delay: 0.2 },
          x: { duration: 1.2, ease, delay: 0.2 },
          y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        className="pointer-events-none absolute bottom-[-10%] w-36 sm:bottom-[-28%] sm:left-[27%] sm:w-70"
      >
        <Image
          src={side}
          alt=""
          className="h-max w-full -rotate-[65deg] scale-x-[-1] object-contain drop-shadow-[0_22px_24px_rgba(0,0,0,0.6)]"
        />
      </motion.div>

      {/* halka golden glow, couple ke peeche */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[70%] w-full max-w-3xl rounded-full bg-[#c9a36a]/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl lg:grid-cols-2">
        {/* ---------- LEFT: couple, bottom se touch ---------- */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease }}
          className="relative order-2 h-[30rem] lg:order-1 lg:h-auto"
        >
          <Image
            src={cpl}
            alt={inviteData.coupleAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
          />
        </motion.div>

        {/* ---------- RIGHT: invitation text ---------- */}
        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease }}
          className="order-1 flex flex-col justify-center px-6 pb-16 text-center sm:px-14 lg:order-2 lg:items-start lg:pb-24 lg:pl-8 lg:pr-14 lg:text-left"
        >
          <p className="font-hindi text-2xl text-[#e6c78f]">{inviteData.hindi}</p>

          <h2
            className="mt-3 font-heading text-5xl font-bold leading-[1.1] text-[#c9a36a] sm:text-6xl"
            style={{ textShadow: "0 8px 24px rgba(0,0,0,0.6)" }}
          >
            {inviteData.heading}
          </h2>

          <Divider className="my-6" />

          {inviteData.paragraphs.map((text, i) => (
            <p
              key={i}
              className={`max-w-lg text-base leading-relaxed text-[#f3e6d3]/90 sm:text-lg ${
                i > 0 ? "mt-4" : ""
              }`}
            >
              {text}
            </p>
          ))}

          <p className="mt-8 font-heading text-2xl italic text-[#e6c78f]">
            {inviteData.signOff}
          </p>
          <p
            className="mt-1 font-heading text-3xl font-bold tracking-[0.06em] text-[#c9a36a]"
            style={{ textShadow: "0 6px 18px rgba(0,0,0,0.55)" }}
          >
            {inviteData.names}
          </p>
          <p className="mt-2 text-[11px] tracking-[0.3em] text-[#f3e6d3]/70">
            {inviteData.families}
          </p>
        </motion.div>
      </div>
    </section>
  );
}