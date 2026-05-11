import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Aarambh — flagship social initiative.
// 8 past editions (2018–2025), 9th in 2026.
// Pictures keep their NATURAL aspect ratios — layout is intentionally assorted.
const AARAMBH_2026_IMG =
    "/assets/aarmbh2026.png";

const EDITIONS = [
    {
        year: "2018",
        edition: "I",
        img: "/assets/aarambh-2018_result.png",
        offsetClass: "md:mt-0",
        note:
            "Started Aarambh — our eco-friendly Ganesha making workshop. Sold handmade Ganeshas crafted by underprivileged kids to raise funds for educational supplies.",
    },
    {
        year: "2019",
        edition: "II",
        img: "/assets/img2019.PNG",
        offsetClass: "md:mt-12",
    },
    {
        year: "2020",
        edition: "III",
        img: "/assets/aarambh-2020_result.png",
        offsetClass: "md:mt-0",
    },
    {
        year: "2021",
        edition: "IV",
        img: "/assets/aarmbh2021.png",
        offsetClass: "md:mt-16",
        note:
              "We started hosting our commercial workshop from this year to add another way, for us to raise more funds for our initiative."
    },
    {
        year: "2022",
        edition: "V",
        img: "/assets/aarambh-2022_result.png",
        offsetClass: "md:mt-4",
    },
    {
        year: "2023",
        edition: "VI",
        img: "/assets/aarmbh2023.png",
        offsetClass: "md:mt-20",
    },
    {
        year: "2024",
        edition: "VII",
        img: "/assets/aarambh-2024_result.png",
        offsetClass: "md:mt-0",
        note:
            "This year, the students of The Art of Living Gurukual at Sri Sri Omkareshwar Ashram made their own little Ganeshas. As every year we also held our commercial workshops to raise funds for the initiative. " },
    {
        year: "2025",
        edition: "VIII",
        img: "/assets/aarmbh2025.png",
        offsetClass: "md:mt-14",
    },
];

const AarambhTimeline = () => {
    const scrollerRef = useRef(null);

    const scrollBy = (dir) => {
        const el = scrollerRef.current;
        if (!el) return;
        const step = Math.round(el.clientWidth * 0.7);
        el.scrollBy({ left: dir * step, behavior: "smooth" });
    };

    return (
        <section
            id="aarambh"
            data-testid="aarambh-section"
            className="relative px-6 md:px-10 py-20 md:py-28 border-t border-[#D1C9C1] bg-[#F0EBE1]"
        >
            <div className="mx-auto max-w-[1280px]">
                <div className="grid grid-cols-12 gap-8 md:gap-12">
                    <div className="col-span-12 md:col-span-3 text-xs uppercase tracking-[0.28em] text-[#7A8B76]">
                        (01·b) — Aarambh, since 2018
                    </div>
                    <div className="col-span-12 md:col-span-9">
                        <motion.h2
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight"
                        >
                            Nine years of{" "}
                            <em className="italic text-[#A65A4B]">beginnings</em>.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1],
                                delay: 0.1,
                            }}
                            className="mt-6 max-w-2xl text-[#2C2A29]/75 leading-relaxed"
                        >
                            <strong className="font-normal text-[#2C2A29]">
                                Aarambh
                            </strong>{" "}
                             as the word suggests has been the beginning for Brhma. 
                            Our flagship social initiative revolves around turning a day of art and devotion 
                            into a means of raising educational funds and support for the underprivileged. 
                            Eight editions in: a decade of culture, fun and impact
                        </motion.p>
                    </div>
                </div>

                {/* Timeline scroller */}
                <div className="mt-14 md:mt-20 relative">
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                        <div className="text-[11px] uppercase tracking-[0.28em] text-[#2C2A29]/55">
                            I &nbsp;—&nbsp; VIII &nbsp;·&nbsp; A decade in the
                            making
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => scrollBy(-1)}
                                data-testid="aarambh-prev"
                                aria-label="Previous editions"
                                className="w-10 h-10 flex items-center justify-center rounded-full border border-[#2C2A29]/30 hover:bg-[#2C2A29] hover:text-[#F5F2EB] transition-colors duration-500"
                            >
                                <ArrowLeft className="w-4 h-4 stroke-[1.4]" />
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollBy(1)}
                                data-testid="aarambh-next"
                                aria-label="Next editions"
                                className="w-10 h-10 flex items-center justify-center rounded-full border border-[#2C2A29]/30 hover:bg-[#2C2A29] hover:text-[#F5F2EB] transition-colors duration-500"
                            >
                                <ArrowRight className="w-4 h-4 stroke-[1.4]" />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={scrollerRef}
                        data-testid="aarambh-scroller"
                        className="flex items-start gap-5 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 md:-mx-10 pl-8 pr-6 md:pl-10 md:pr-10 scroll-pl-8 md:scroll-pl-10"
                        style={{ scrollbarWidth: "thin" }}
                    >
                        {EDITIONS.map((e, i) => (
                            <motion.figure
                                key={e.year}
                                data-testid={`aarambh-${e.year}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: 0.9,
                                    delay: i * 0.06,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className={`shrink-0 snap-start w-[260px] md:w-[340px] ${e.offsetClass}`}
                            >
                                <div className="relative overflow-hidden rounded-sm border border-[#D1C9C1] bg-[#F5F2EB] group">
                                    {/* natural aspect ratio — no cropping */}
                                    <img
                                        src={e.img}
                                        alt={`Aarambh Edition ${e.edition} · ${e.year}`}
                                        className="block w-full h-auto transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                                        loading="lazy"
                                    />
                                    <div className="absolute bottom-3 left-3 bg-[#F5F2EB]/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.24em]">
                                        Edition {e.edition}
                                    </div>
                                </div>
                                <figcaption className="mt-4 flex items-baseline gap-3">
                                    <span className="font-display italic text-4xl md:text-5xl leading-none text-[#2C2A29]">
                                        {e.year}
                                    </span>
                                    <span className="h-px flex-1 bg-[#2C2A29]/25 translate-y-[-6px]" />
                                </figcaption>
                                {e.note && (
                                    <p
                                        data-testid={`aarambh-note-${e.year}`}
                                        className="mt-3 text-[12px] leading-[1.55] text-[#2C2A29]/65"
                                    >
                                        {e.note}
                                    </p>
                                )}
                            </motion.figure>
                        ))}

                        {/* 9th edition, coming in 2026 */}
                        <motion.figure
                            data-testid="aarambh-2026"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                                duration: 0.9,
                                delay: EDITIONS.length * 0.06,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="shrink-0 snap-start w-[260px] md:w-[340px] md:mt-6"
                        >
                            <div className="relative overflow-hidden rounded-sm border border-dashed border-[#A65A4B]/60 bg-[#F5F2EB] aspect-[3/4] flex flex-col items-center justify-center text-center p-6">
                                {/* low-opacity background photo */}
                                <img
                                    src={AARAMBH_2026_IMG}
                                    alt=""
                                    aria-hidden
                                    className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
                                />
                                {/* warm wash to keep text readable */}
                                <div className="absolute inset-0 bg-[#F5F2EB]/55 pointer-events-none" />

                                <div className="relative text-[10px] uppercase tracking-[0.28em] text-[#7A8B76]">
                                    Edition IX
                                </div>
                                <div className="relative mt-3 font-display italic text-4xl md:text-5xl text-[#A65A4B] leading-none">
                                    2026
                                </div>
                                <div className="relative mt-4 text-xs uppercase tracking-[0.24em] text-[#2C2A29]/80">
                                    Coming this year
                                </div>
                                <div className="relative mt-6 w-10 h-px bg-[#A65A4B]/60" />
                                <p className="relative mt-5 text-sm text-[#2C2A29]/85 leading-relaxed max-w-[220px]">
                                    Our ninth year of Aarambh — in conversation
                                    soon.
                                </p>
                            </div>
                            <figcaption className="mt-4 flex items-baseline gap-3">
                                <span className="font-display italic text-4xl md:text-5xl leading-none text-[#A65A4B]">
                                    2026
                                </span>
                                <span className="h-px flex-1 bg-[#A65A4B]/30 translate-y-[-6px]" />
                            </figcaption>
                        </motion.figure>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AarambhTimeline;
