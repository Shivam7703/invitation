"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { saveTheDateData, calendarUrl } from "@/component/data";

const {
  year: YEAR,
  month: MONTH,
  day: DAY,
  weddingISO,
  weekdays: WEEKDAYS,
  countdownLabels,
} = saveTheDateData;

const monthName = new Date(YEAR, MONTH, 1).toLocaleString("en-US", { month: "long" });

/* ---------------- Countdown (left) ---------------- */
function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now === null ? 0 : Math.max(0, new Date(weddingISO).getTime() - now);
  return [
    { label: countdownLabels[0], value: Math.floor(diff / 864e5) },
    { label: countdownLabels[1], value: Math.floor(diff / 36e5) % 24 },
    { label: countdownLabels[2], value: Math.floor(diff / 6e4) % 60 },
    { label: countdownLabels[3], value: Math.floor(diff / 1e3) % 60 },
  ];
}

/* ---------------- Calendar (right) ---------------- */
function Calendar() {
  const reduce = useReducedMotion();

  // mouse -> 3D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 16 });
  const sy = useSpring(my, { stiffness: 90, damping: 16 });
  const rotateY = useTransform(sx, [-1, 1], [-14, 14]);
  const rotateX = useTransform(sy, [-1, 1], [10, -10]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const firstDay = new Date(YEAR, MONTH, 1).getDay();
  const totalDays = new Date(YEAR, MONTH + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  const grid: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.012, delayChildren: 0.5 } },
  };
  const cell: Variants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ perspective: 1100 }}
      className="mx-auto w-full max-w-sm"
    >
      <motion.div
        initial={{ opacity: 0, rotateX: reduce ? 0 : 35, y: 50 }}
        whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative rounded-lg bg-gradient-to-b from-[#fffaf0] to-[#f3e3c8] shadow-[0_35px_70px_-15px_rgba(0,0,0,0.75)]"
        >
          {/* binding rings (aage nikli hui) */}
          <div
            className="absolute -top-3 left-0 right-0 z-10 flex justify-around px-10"
            style={{ transform: "translateZ(40px)" }}
          >
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="h-6 w-2.5 rounded-full bg-linear-to-b from-[#e6c78f] to-[#8a6a35] shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
              />
            ))}
          </div>

          {/* header */}
          <div
            className="rounded-t-lg bg-gradient-to-b from-[#7a1a30] to-[#5e1224] px-6 pb-5 pt-9 text-center"
            style={{ transform: "translateZ(20px)" }}
          >
            <p className="text-[11px] tracking-[0.3em] text-[#e6c78f]/80">{YEAR}</p>
            <h3 className="font-heading text-4xl font-bold tracking-[0.08em] text-[#e6c78f]">
              {monthName.toUpperCase()}
            </h3>
          </div>

          {/* days */}
          <div className="px-5 pb-6 pt-4">
            <div className="grid grid-cols-7 text-center text-xs font-medium text-[#8a6a35]">
              {WEEKDAYS.map((d, i) => (
                <span key={i} className="py-2">{d}</span>
              ))}
            </div>

            <motion.div
              variants={grid}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-7 gap-y-1 text-center"
            >
              {cells.map((d, i) => {
                if (d === null) return <span key={i} />;
                const isWedding = d === DAY;
                return (
                  <motion.div
                    key={i}
                    variants={cell}
                    className="relative flex h-10 items-center justify-center"
                  >
                    {isWedding ? (
                      <>
                        {/* pulsing ring */}
                        <motion.span
                          className="absolute h-10 w-10 rounded-full border-2 border-[#c9a36a]"
                          animate={{ scale: [1, 1.7], opacity: [0.8, 0] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                        />
                        <motion.span
                          className="absolute h-10 w-10 rounded-full border border-[#c9a36a]"
                          animate={{ scale: [1, 2.1], opacity: [0.6, 0] }}
                          transition={{ duration: 1.8, delay: 0.6, repeat: Infinity, ease: "easeOut" }}
                        />
                        {/* highlighted date */}
                        <motion.span
                          initial={{ scale: 0, rotate: -90 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          viewport={{ once: true }}
                          animate={{ y: [0, -3, 0] }}
                          transition={{
                            scale: { type: "spring", stiffness: 200, damping: 12, delay: 1.1 },
                            rotate: { type: "spring", stiffness: 200, damping: 12, delay: 1.1 },
                            y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
                          }}
                          className="relative pb-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#7a1a30] to-[#4a0d1c] font-heading text-xl font-black text-[#e6c78f] shadow-[0_10px_18px_rgba(94,18,36,0.55)] ring-2 ring-[#c9a36a]"
                          style={{ z: 50 }}
                        >
                          {d}
                        </motion.span>
                      </>
                    ) : (
                      <span className="font-heading text-lg text-[#3a0a16]">{d}</span>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>

            <p className="mt-4 text-center font-heading text-lg italic text-[#5e1224]">
              {saveTheDateData.calendarNote}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ---------------- Section ---------------- */
export default function SaveTheDate() {
  const reduce = useReducedMotion();
  const time = useCountdown();

  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-[#3a0a16] via-[#4a0d1c] to-[#1a0509] px-6 py-8 text-[#f3e6d3] sm:p-16">
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        {/* ---------- LEFT: timer + button ---------- */}
        <motion.div
          initial={{ opacity: 0, x: reduce ? 0 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center lg:text-left"
        >
          <p className="text-[11px] tracking-[0.3em] text-[#f3e6d3]/70">
            {saveTheDateData.eyebrow}
          </p>
          <h2
            className="mt-2 font-heading text-4xl font-bold tracking-[0.04em] text-[#c9a36a] sm:text-5xl"
            style={{ textShadow: "0 6px 20px rgba(0,0,0,0.6)" }}
          >
            {saveTheDateData.heading}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-[#f3e6d3]/80 sm:text-base lg:max-w-sm">
            {saveTheDateData.description}
          </p>

          {/* timer */}
          <div
            className="mt-10 grid grid-cols-4 gap-3 sm:gap-4"
            style={{ perspective: 800 }}
          >
            {time.map((t, i) => (
              <motion.div
                key={t.label}
                whileHover={reduce ? undefined : { rotateX: -14, rotateY: i % 2 ? 10 : -10, y: -4 }}
                className="rounded-xl border border-[#c9a36a]/30 bg-gradient-to-b from-[#5e1224] to-[#3a0a16] py-5 text-center shadow-[0_14px_28px_rgba(0,0,0,0.55)] sm:py-7"
              >
                <div className="font-heading text-3xl font-bold tabular-nums text-[#c9a36a] sm:text-5xl">
                  {String(t.value).padStart(2, "0")}
                </div>
                <div className="mt-1 text-[10px] tracking-[0.2em] text-[#f3e6d3]/70 sm:text-xs">
                  {t.label.toUpperCase()}
                </div>
              </motion.div>
            ))}
          </div>

          {/* button */}
          <motion.a
            href={calendarUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="mt-10 inline-block rounded-sm bg-[#6b4513] px-8 py-3.5 text-xs tracking-[0.25em] text-[#e6c78f] shadow-[0_14px_30px_rgba(0,0,0,0.55)] transition-colors hover:bg-[#82561a]"
          >
            {saveTheDateData.buttonText}
          </motion.a>
        </motion.div>

        {/* ---------- RIGHT: calendar ---------- */}
        <Calendar />
      </div>
    </section>
  );
}