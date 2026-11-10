"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { tilak, haldi, mehndi, wedding } from "@/assets";

/* ✏️ Time aur venue yahin se badlo */
const VENUE = "The Grand Pavilion, Civil Lines, Delhi, India";

type EventItem = {
  id: string;
  name: string;
  hindi: string;
  img: StaticImageData;
  day: string;
  month: string;
  year: string;
  weekday: string;
  time: string;
};

const events: EventItem[] = [
  { id: "tilak", name: "Tilak", hindi: "तिलक", img: tilak, day: "29", month: "JAN", year: "2027", weekday: "Friday", time: "11:00 AM onwards" },
  { id: "haldi", name: "Haldi", hindi: "हल्दी", img: haldi, day: "01", month: "FEB", year: "2027", weekday: "Monday", time: "11:00 AM onwards" },
  { id: "mehndi", name: "Mehndi", hindi: "मेहंदी", img: mehndi, day: "02", month: "FEB", year: "2027", weekday: "Tuesday", time: "4:00 PM onwards" },
  { id: "wedding", name: "Wedding", hindi: "विवाह", img: wedding, day: "04", month: "FEB", year: "2027", weekday: "Thursday", time: "7:00 PM onwards" },
];

const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE)}`;

/* ---------- small ornaments ---------- */
function Corner({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`absolute h-8 w-8 ${className}`} aria-hidden>
      <path d="M2 38V12Q2 2 12 2h26" fill="none" stroke="#a67c3a" strokeWidth="1.5" />
      <path d="M2 22q10 0 10-10" fill="none" stroke="#a67c3a" strokeWidth="1" />
      <circle cx="12" cy="12" r="2.5" fill="#a67c3a" />
    </svg>
  );
}

function MiniDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#a67c3a]" />
      <span className="h-2 w-2 rotate-45 bg-[#a67c3a]" />
      <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#a67c3a]" />
    </div>
  );
}

/* ---------- one sticky card ---------- */
function EventCard({
  e,
  onActive,
}: {
  e: EventItem;
  onActive: (id: string) => void;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (inView) onActive(e.id);
  }, [inView, e.id, onActive]);

  return (
    <div ref={ref} id={e.id} className="relative">
      <motion.article
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-sm border-2 border-[#8a6a35] bg-gradient-to-b from-[#fffaf0] to-[#f6e8d0] p-2 shadow-[0_22px_45px_rgba(94,18,36,0.28)]"
      >
        {/* couple image: aadha andar, aadha bahar (size same) */}
        <div className="absolute left-40 top-8 z-20  -translate-y-1/2 md:left-7 md:top-1/2 md:-translate-x-1/2">
          <motion.div
            animate={reduce ? undefined : { y: [8, -8, 8] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src={e.img}
              alt={`${e.name} illustration`}
              className="w-60 drop-shadow-[0_14px_20px_rgba(58,10,22,0.45)] md:w-94"
            />
          </motion.div>
        </div>

        {/* text right shift: md:pl-[16rem] */}
        <div className="relative border border-[#c9a36a] px-6 pb-8 pt-20 text-left md:py-9 md:pl-[15rem] md:pr-8 md:text-left">
          <Corner className="left-1 top-1" />
          <Corner className="right-1 top-1 rotate-90" />
          <Corner className="bottom-1 right-1 rotate-180" />
          <Corner className="bottom-1 left-1 -rotate-90" />

          <p className=" text-xl text-[#8a6a35]">{e.hindi}</p>
          <h3 className="font-heading text-5xl font-bold text-[#5e1224]">{e.name}</h3>
          <MiniDivider className="my-4 justify-start md:justify-start" />

          <div className="flex items-center justify-start gap-4 md:justify-start">
            <span className="font-heading text-6xl font-bold leading-none text-[#5e1224]">{e.day}</span>
            <span className="h-12 w-px bg-[#a67c3a]/60" />
            <div className="text-left">
              <p className="font-heading text-2xl font-semibold tracking-widest text-[#8a6a35]">
                {e.month} {e.year}
              </p>
              <p className="font-heading text-xl italic text-[#3a0a16]">{e.weekday}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-[11px] tracking-[0.25em] text-[#8a6a35]">TIME</p>
              <p className="font-heading text-xl font-semibold text-[#3a0a16]">{e.time}</p>
            </div>
            <div>
              <p className="text-[11px] tracking-[0.25em] text-[#8a6a35]">VENUE</p>
              <p className="font-heading text-xl font-semibold text-[#3a0a16]">{VENUE}</p>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block border-b border-[#5e1224]/50 text-xs tracking-[0.2em] text-[#5e1224] transition-colors hover:border-[#5e1224]"
              >
                VIEW ON GOOGLE MAPS
              </a>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

/* ---------- section ---------- */
export default function Events() {
  const [active, setActive] = useState(events[0].id);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    // overflow-x-clip (hidden nahi): warna sticky kaam nahi karta
    <section className="relative w-full overflow-x-clip bg-gradient-to-b from-[#f8efe0] to-[#f1e0c4] px-6 pb-28 pt-36 text-[#3a0a16] sm:px-14">
      {/* dark (SaveTheDate) se smooth transition */}

    <div className="relative mx-auto grid max-w-[90rem] items-start gap-16 lg:grid-cols-[1fr_40rem] lg:gap-x-[14rem]">
        {/* ---------- LEFT: intro + menu ---------- */}
        <div className="lg:sticky lg:top-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h2 className="font-heading text-5xl font-bold tracking-[0.04em] text-[#5e1224] sm:text-6xl">
              Events
            </h2>
            <MiniDivider className="my-5 justify-center lg:justify-start" />
            <p className="mx-auto max-w-md text-sm leading-relaxed text-[#3a0a16]/80 sm:text-base lg:mx-0">
              Four days of rituals, music and blessings. Scroll through each ceremony to see
              when and where it happens, or pick one from the list.
            </p>
          </motion.div>

          <ul className="mt-8 grid grid-cols-2 gap-2 lg:grid-cols-1">
            {events.map((ev) => {
              const on = active === ev.id;
              return (
                <li key={ev.id}>
                  <button
                    onClick={() => go(ev.id)}
                    aria-current={on ? "true" : undefined}
                    className={`relative w-full overflow-hidden rounded-sm border border-[#c9a36a]/50 px-5 py-3 text-left transition-colors ${
                      on ? "text-[#e6c78f]" : "text-[#5e1224]/70 hover:text-[#5e1224]"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="event-active"
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                        className="absolute inset-0 rounded-sm bg-[#5e1224] shadow-md"
                      />
                    )}
                    <span className="relative flex items-baseline justify-between gap-3">
                      <span className="font-heading text-2xl font-semibold">{ev.name}</span>
                      <span className="text-xs tracking-widest opacity-80">
                        {ev.day} {ev.month}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ---------- RIGHT: sticky stacking cards ---------- */}
       {/* ---------- RIGHT: cards ---------- */}
<div className="space-y-16 pt-12 md:pl-20 lg:space-y-12 lg:pl-0 lg:pt-0">
  {events.map((ev) => (
    <EventCard key={ev.id} e={ev} onActive={setActive} />
  ))}
</div>
      </div>
    </section>
  );
}