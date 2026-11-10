"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ✏️ Saari details yahin se badlo (phone: country code ke saath, + aur space ke bina) */
const COUPLE = "Nikhil & Ritika";
const VENUE = "The Grand Pavilion, Civil Lines, Delhi, India";
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE)}`;

const INVITED_BY = [
    { side: "Groom's Family", names: "Mr. Rajesh & Mrs. Sunita Sharma" },
    { side: "Bride's Family", names: "Mr. Suresh & Mrs. Anita Verma" },
];

const CONTACTS = [
    { name: "Shivam Goyal", role: "Groom's Father", phone: "918218885483", display: "+91 8218885483" },
    { name: "Shivam Goyal", role: "Bride's Father", phone: "918218885483", display: "+91 8218885483" },
];

const SCHEDULE = [
    { name: "Tilak", date: "29 Jan 2027" },
    { name: "Haldi", date: "1 Feb 2027" },
    { name: "Mehndi", date: "2 Feb 2027" },
    { name: "Wedding", date: "4 Feb 2027" },
];

const RSVP_PHONE = CONTACTS[0].phone;

function Divider({ className = "" }: { className?: string }) {
    return (
        <div className={`flex items-center justify-center gap-3 ${className}`}>
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#c9a36a]" />
            <span className="h-2 w-2 rotate-45 border border-[#c9a36a] bg-[#c9a36a]/40" />
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#c9a36a]" />
        </div>
    );
}

function Heading({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="font-heading text-2xl font-semibold tracking-[0.06em] text-[#c9a36a]">
            {children}
        </h3>
    );
}

export default function Footer() {
    const reduce = useReducedMotion();
    const [copied, setCopied] = useState(false);

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    const shareOnWhatsApp = () => {
        const text = `You are warmly invited to the wedding of ${COUPLE}. ${window.location.href}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    };

    const rsvp = () => {
        const text = `Hello! I would like to confirm my presence at ${COUPLE}'s wedding.`;
        window.open(`https://wa.me/${RSVP_PHONE}?text=${encodeURIComponent(text)}`, "_blank");
    };

    const btn =
        "rounded-sm border border-[#c9a36a]/60 px-5 py-2.5 text-[11px] tracking-[0.22em] text-[#e6c78f] transition-colors hover:bg-[#c9a36a] hover:text-[#1a0509]";

    const fade = {
        initial: { opacity: 0, y: reduce ? 0 : 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
    };

    return (
        <footer className="relative w-full overflow-hidden bg-gradient-to-b  from-[#3a0a16] via-[#4a0d1c] to-[#1a0509]  px-6 pb-10 pt-20 text-[#f3e6d3] sm:px-14">
            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-[#c9a36a]/10 blur-3xl" />

            {/* ---------- TOP: blessing + names ---------- */}
            <motion.div {...fade} className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
                <p className="font-hindi text-2xl text-[#e6c78f]">॥ शुभ विवाह ॥</p>
                <h2
                    className="mt-5 font-script text-6xl text-[#c9a36a] sm:text-7xl"
                    style={{ textShadow: "0 8px 24px rgba(0,0,0,0.6)" }}
                >
                    Nikhil &amp; Ritika
                </h2>
                <Divider className="my-6" />
                <p className="max-w-md text-sm leading-relaxed text-[#f3e6d3]/80 sm:text-base">
                    Thank you for being a part of our story. We can&apos;t wait to celebrate with you.
                </p>
            </motion.div>

            {/* ---------- 3 COLUMNS ---------- */}
            <motion.div
                {...fade}
                className="relative mx-auto mt-16 grid max-w-6xl gap-12 text-center md:grid-cols-3 md:text-left"
            >
                {/* Contact */}
                <div>
                    <Heading>Contact Us</Heading>
                    <ul className="mt-5 space-y-6">
                        {CONTACTS.map((c) => (
                            <li key={c.phone}>
                                <p className="font-heading text-xl font-semibold text-[#f3e6d3]">{c.name}</p>
                                <p className="text-xs tracking-[0.2em] text-[#f3e6d3]/60">{c.role.toUpperCase()}</p>
                                <a
                                    href={`tel:+${c.phone}`}
                                    className="mt-1 inline-block text-base text-[#e6c78f] hover:underline"
                                >
                                    {c.display}
                                </a>
                                <div className="mt-2 flex justify-center gap-2 md:justify-start">
                                    <a href={`tel:+${c.phone}`} className={btn}>CALL</a>
                                    <a
                                        href={`https://wa.me/${c.phone}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={btn}
                                    >
                                        WHATSAPP
                                    </a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Venue */}
                <div>
                    <Heading>Venue</Heading>
                    <p className="mt-5 font-heading text-xl leading-snug text-[#f3e6d3]">{VENUE}</p>
                    <a
                        href={MAPS_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-block border-b border-[#c9a36a]/60 text-xs tracking-[0.22em] text-[#e6c78f] hover:border-[#e6c78f]"
                    >
                        OPEN IN GOOGLE MAPS
                    </a>
                    <p className="mt-8 text-xs tracking-[0.2em] text-[#f3e6d3]/60">WEDDING DAY</p>
                    <p className="font-heading text-xl italic text-[#e6c78f]">Thursday, 4th February 2027</p>
                </div>

                {/* Schedule */}
                <div>
                    <Heading>Celebrations</Heading>
                    <ul className="mt-5 space-y-3">
                        {SCHEDULE.map((s) => (
                            <li
                                key={s.name}
                                className="flex items-baseline justify-between gap-4 border-b border-[#c9a36a]/15 pb-2"
                            >
                                <span className="font-heading text-xl text-[#f3e6d3]">{s.name}</span>
                                <span className="text-sm tracking-wider text-[#e6c78f]">{s.date}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>

            {/* ---------- INVITED BY ---------- */}
            <motion.div {...fade} className="relative mx-auto mt-16 max-w-3xl text-center">
                <Divider className="mb-8" />
                <p className="text-[11px] tracking-[0.3em] text-[#f3e6d3]/60">WITH BEST COMPLIMENTS FROM</p>
                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                    {INVITED_BY.map((f) => (
                        <div key={f.side}>
                            <p className="text-xs tracking-[0.2em] text-[#e6c78f]">{f.side.toUpperCase()}</p>
                            <p className="mt-1 font-heading text-xl font-semibold text-[#f3e6d3]">{f.names}</p>
                        </div>
                    ))}
                </div>

                {/* RSVP + share */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={rsvp}
                        className="rounded-sm bg-[#6b4513] px-7 py-3 text-xs tracking-[0.25em] text-[#e6c78f] shadow-[0_14px_30px_rgba(0,0,0,0.55)] transition-colors hover:bg-[#82561a]">
                        RSVP ON WHATSAPP
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={shareOnWhatsApp} className={btn}>
                        SHARE INVITE
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={copyLink} className={btn} aria-live="polite">
                        {copied ? "LINK COPIED" : "COPY LINK"}
                    </motion.button>
                </div>

                <p className="mt-12 font-heading text-lg italic text-[#c9a36a]/80">
                    A celebration of love &amp; togetherness
                </p>
            </motion.div>

            <div className="relative mx-auto mt-12 max-w-4xl border-t border-[#c9a36a]/20 pt-6 text-center">
                <p className="text-[11px] tracking-[0.3em] text-[#f3e6d3]/50">
                    © 2027 NIKHIL &amp; RITIKA · WITH LOVE, THE SHARMA &amp; VERMA FAMILIES
                </p>
            </div>
        </footer>
    );
}