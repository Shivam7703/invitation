"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { couple, side } from "@/assets";
import { familyData, type FamilyCardData } from "@/component/data";

/* corner ornament: ek hi SVG, rotate karke chaaron corners par */
function Corner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`absolute h-9 w-9 ${className}`} aria-hidden>
      <path d="M2 38V12Q2 2 12 2h26" fill="none" stroke="#a67c3a" strokeWidth="1.5" />
      <path d="M2 22q10 0 10-10" fill="none" stroke="#a67c3a" strokeWidth="1" />
      <circle cx="12" cy="12" r="2.5" fill="#a67c3a" />
    </svg>
  );
}

function Divider() {
  return (
    <div className="my-5 flex items-center justify-center gap-2">
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#a67c3a]" />
      <span className="h-2 w-2 rotate-45 bg-[#a67c3a]" />
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#a67c3a]" />
    </div>
  );
}

type CardProps = FamilyCardData & { grandparentsTitle: string };

function FamilyCard({
  hindi,
  label,
  family,
  parentsTitle,
  parents,
  grandparentsTitle,
  grandparents,
}: CardProps) {
  return (
    <div className="relative rounded-sm border-2 border-[#8a6a35] bg-gradient-to-b from-[#fffaf0] to-[#f6e8d0] p-2 shadow-[0_18px_40px_rgba(94,18,36,0.25)]">
      <div className="relative border border-[#c9a36a] px-6 pb-9 pt-11 text-center">
        <Corner className="left-1 top-1" />
        <Corner className="right-1 top-1 rotate-90" />
        <Corner className="bottom-1 right-1 rotate-180" />
        <Corner className="bottom-1 left-1 -rotate-90" />

        {/* ribbon label */}
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-[#5e1224] px-6 py-1.5 font-hindi text-lg text-[#e6c78f] shadow-md">
          {hindi}
        </span>

        <p className="text-[11px] tracking-[0.3em] text-[#5e1224]/70">{label}</p>
        <h3 className="mt-2 font-heading text-3xl font-bold text-[#5e1224]">{family}</h3>

        <Divider />

        <p className="text-xs uppercase tracking-wider text-[#8a6a35]">{parentsTitle}</p>
        <p className="mt-1 font-heading text-xl font-semibold text-[#3a0a16]">{parents}</p>

        <div className="mx-auto my-5 h-px w-16 bg-[#a67c3a]/40" />

        <p className="text-xs uppercase tracking-wider text-[#8a6a35]">{grandparentsTitle}</p>
        <p className="mt-1 font-heading text-lg text-[#3a0a16]/90">{grandparents}</p>
      </div>
    </div>
  );
}

export default function Family() {
  const reduce = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  const slideFromLeft: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
  };
  const slideFromRight: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
  };
  const scaleUp: Variants = {
    hidden: { opacity: 0, scale: reduce ? 1 : 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, ease } },
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#f8efe0] to-[#f1e0c4] px-6 py-8 text-[#3a0a16] sm:p-14">
      <Image
        src={side}
        alt={familyData.sideAlt}
        className="absolute left-[-4%] -top-6 sm:h-90 h-36 w-max object-contain "
      />
      <Image
        src={side}
        alt={familyData.sideAlt}
        className="absolute right-[-4%] -top-6 sm:h-90 h-36 w-max object-contain scale-x-[-1]"
      />

      {/* ---------- HEADER ---------- */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <p className="text-[11px] tracking-[0.3em] text-[#5e1224]/70">
          {familyData.eyebrow}
        </p>
        <h2 className="mt-2 font-heading text-4xl font-bold tracking-[0.06em] text-[#5e1224] sm:text-5xl">
          {familyData.heading}
        </h2>
        <Divider />
        <p className="max-w-xl text-sm leading-relaxed text-[#3a0a16]/80 sm:text-base">
          {familyData.description}
        </p>
      </motion.div>

      {/* ---------- GROOM | COUPLE | BRIDE ---------- */}
      <div className="relative mx-auto mt-16 grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-3 lg:gap-8">
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="order-2 lg:order-1"
        >
          <FamilyCard
            {...familyData.groom}
            grandparentsTitle={familyData.grandparentsTitle}
          />
        </motion.div>

        <motion.div
          variants={scaleUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="order-1 flex justify-center lg:order-2"
        >
          <div className="group relative">
            <div className="absolute inset-2 rounded-full bg-[#5e1224]/25 blur-2xl transition-all duration-500 group-hover:bg-[#5e1224]/35" />
            <div className="relative h-64 w-64 rounded-full border-2 border-dashed border-[#8a6a35] bg-[#fffaf0] p-2 shadow-[0_12px_35px_rgba(94,18,36,0.3)] sm:h-90 sm:w-90">
              <div className="h-full w-full overflow-hidden rounded-full border-2 border-[#a67c3a]">
                <Image
                  src={couple}
                  alt={familyData.coupleAlt}
                  className="h-full w-full object-cover scale-x-[-1] rounded-full  transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={slideFromRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="order-3"
        >
          <FamilyCard
            {...familyData.bride}
            grandparentsTitle={familyData.grandparentsTitle}
          />
        </motion.div>
      </div>
    </section>
  );
}