import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { ArrowUpRight } from "lucide-react";

const EXPERIENCES = [
    {
        num: "01",
        title: "Cyanotype Printing Workshop",
        tags: ["Printmaking", "Sunlight"],
        blurb:
            "A hands-on introduction to cyanotype — the oldest blueprint process. Coat, compose, and let the sun make the print.",
        img: "/assets/jobbrhma-workshops_result.png",
        ig: "https://www.instagram.com/reel/DH2eFiFRh5p/",
    },
    {
        num: "02",
        title: "Metal Muse",
        tags: ["Metal Embossing", "Relief Art"],
        blurb:
            "An intimate session in metal embossing — coaxing soft aluminium and copper sheets into raised motifs with nothing but stylus, patience and pressure.",
        img: "/assets/job_brhma-workshop_result.png",
        ig: "https://www.instagram.com/reel/DXzKv_bonn-/",
    },
    {
        num: "03",
        title: "Art Therapy",
        tags: ["Wellbeing", "Expressive Arts"],
        blurb:
            "A guided session using paint, paper and play as tools to slow down, reflect and release — art as a quiet form of care.",
        img: "/assets/job_brhma-workshops_result.png",
        ig: "https://www.instagram.com/reel/DOIoSvSjNA-/",
    },
    {
        num: "04",
        title: "Shinrin Yoku",
        tags: ["Forest Bathing", "Outdoor"],
        blurb:
            "A Japanese forest-bathing ritual reimagined for Indian landscapes — walking slowly, noticing deeply, sketching what stays.",
        img: "/assets/shinrin-yoku_result.jpg",
        ig: "https://www.instagram.com/reel/C5yiJpqR0-r/",
    },
    {
        num: "05",
        title: "Vision Board",
        tags: ["Intention-Setting", "Collage"],
        blurb:
            "A slow, reflective afternoon of magazine clippings, typography and colour — piecing together a personal collage of where you're headed, and why.",
        img: "/assets/vision-board_result.png",
        ig: "https://www.instagram.com/reel/DUPn2ylEYJs/",
    },
];

// More experience names — each links to its Brhma Instagram reel.
const MORE_ROW_ONE = [
    {
        name: "Lippan Kaam",
        href: "https://www.instagram.com/reel/DBOSV45OkGx/",
    },
    {
        name: "Clay Canvas",
        href: "https://www.instagram.com/reel/DHk89GvSWJD/",
    },
    {
        name: "Book Reading",
        href: "https://www.instagram.com/reel/DFmtsB_xpNR/",
    },
    {
        name: "Candle Making",
        href: "https://www.instagram.com/reel/DEAGXoxMAQq/",
    },
];
const MORE_ROW_TWO = [
    {
        name: "Enamel Art",
        href: "https://www.instagram.com/reel/C32T_N8Ry26/",
    },
    {
        name: "Origami",
        href: "https://www.instagram.com/reel/C66jGsuMtB2/",
    },
    {
        name: "Hasth Rang",
        href: "https://www.instagram.com/reel/DILG-baRafL/",
    },
];

const Experiences = () => {
    return (
        <section
            id="experiences"
            data-testid="experiences-section"
            className="relative px-6 md:px-10 py-20 md:py-28 border-t border-[#D1C9C1]"
        >
            <div className="mx-auto max-w-[1280px]">
                <div className="grid grid-cols-12 gap-8 md:gap-12 mb-12 md:mb-16">
                    <div className="col-span-12 md:col-span-3 text-xs uppercase tracking-[0.28em] text-[#7A8B76]">
                        (02) — Unique Experiences
                    </div>
                    <div className="col-span-12 md:col-span-9">
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight">
                            Original formats, born in-house.
                        </h2>
                        <p className="mt-4 max-w-xl text-[#2C2A29]/70 leading-relaxed">
                            A living library of experiences designed by Brhma —
                            each one an intellectual property of the studio.
                            Hosted a few times a year, never the same twice.
                        </p>
                    </div>
                </div>

                <div
                    className="flex flex-col gap-20 md:gap-28"
                    data-testid="experiences-list"
                >
                    {EXPERIENCES.map((e, i) => (
                        <motion.article
                            key={e.num}
                            data-testid={`experience-${e.num}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className={`grid grid-cols-12 gap-6 md:gap-10 group ${
                                i % 2 === 1 ? "md:[&>figure]:col-start-5" : ""
                            }`}
                        >
                            <figure
                                className={`col-span-12 ${
                                    i % 2 === 0
                                        ? "md:col-span-8"
                                        : "md:col-span-8"
                                } relative overflow-hidden rounded-sm border border-[#D1C9C1]`}
                            >
                                <a
                                    href={e.ig}
                                    target="_blank"
                                    rel="noreferrer"
                                    data-testid={`experience-${e.num}-ig`}
                                    aria-label={`Watch ${e.title} on Instagram`}
                                    className="block relative cursor-pointer"
                                >
                                    <img
                                        src={e.img}
                                        alt={e.title}
                                        className={`w-full h-[55vh] md:h-[70vh] object-cover transition-transform duration-[1600ms] group-hover:scale-[1.04] ${
                                            e.imgClass || ""
                                        }`}
                                    />
                                    <span className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 bg-[#F5F2EB]/90 backdrop-blur px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        Watch on Instagram
                                        <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.4]" />
                                    </span>
                                </a>
                            </figure>
                            <div
                                className={`col-span-12 ${
                                    i % 2 === 0
                                        ? "md:col-span-4"
                                        : "md:col-span-4 md:col-start-1 md:row-start-1"
                                } flex flex-col justify-end pb-2`}
                            >
                                <div className="text-[11px] tracking-[0.28em] text-[#2C2A29]/50 mb-3">
                                    {e.num}
                                </div>
                                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1] tracking-tight">
                                    {e.title}
                                </h3>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {e.tags.map((t) => (
                                        <span
                                            key={t}
                                            className="text-[10px] uppercase tracking-[0.22em] text-[#2C2A29]/60 border border-[#2C2A29]/25 rounded-full px-3 py-1"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <p className="mt-6 text-[#2C2A29]/75 leading-relaxed max-w-sm">
                                    {e.blurb}
                                </p>
                                <a
                                    href="#contact"
                                    data-testid={`experience-${e.num}-enquire`}
                                    className="mt-6 inline-flex items-center gap-2 text-sm link-underline w-fit text-[#A65A4B]"
                                >
                                    Enquire
                                    <ArrowUpRight className="w-4 h-4 stroke-[1.4]" />
                                </a>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* More experiences — clickable marquee linking to Instagram */}
                <div
                    data-testid="more-experiences"
                    className="mt-24 md:mt-32 pt-10 md:pt-14 border-t border-[#2C2A29]/20"
                >
                    <div className="grid grid-cols-12 gap-8 md:gap-12 mb-8 md:mb-10">
                        <div className="col-span-12 md:col-span-3 text-xs uppercase tracking-[0.28em] text-[#7A8B76]">
                            (02·b) — More from the studio
                        </div>
                        <div className="col-span-12 md:col-span-9">
                            <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight max-w-3xl">
                                A few more we've gathered around — tap any to peek
                                inside on{" "}
                                <em className="italic text-[#A65A4B]">
                                    Instagram
                                </em>
                                .
                            </h3>
                        </div>
                    </div>

                    <div className="-mx-6 md:-mx-10 space-y-2 md:space-y-3">
                        <Marquee
                            gradient
                            gradientColor="#F5F2EB"
                            gradientWidth={120}
                            speed={40}
                            pauseOnHover
                            className="py-2"
                        >
                            {MORE_ROW_ONE.map((m, i) => (
                                <a
                                    key={`r1-${m.name}-${i}`}
                                    href={m.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    data-testid={`more-exp-r1-${i}`}
                                    className="group inline-flex items-center gap-3 mx-6 md:mx-10 cursor-pointer"
                                >
                                    <span className="font-display text-3xl md:text-5xl lg:text-6xl font-light italic text-[#2C2A29] group-hover:text-[#A65A4B] transition-colors duration-500">
                                        {m.name}
                                    </span>
                                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 stroke-[1.2] text-[#2C2A29]/45 group-hover:text-[#A65A4B] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
                                    <span className="text-[#2C2A29]/30 font-display text-3xl md:text-5xl lg:text-6xl">
                                        ·
                                    </span>
                                </a>
                            ))}
                        </Marquee>

                        <Marquee
                            gradient
                            gradientColor="#F5F2EB"
                            gradientWidth={120}
                            speed={30}
                            direction="right"
                            pauseOnHover
                            className="py-2"
                        >
                            {MORE_ROW_TWO.map((m, i) => (
                                <a
                                    key={`r2-${m.name}-${i}`}
                                    href={m.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    data-testid={`more-exp-r2-${i}`}
                                    className="group inline-flex items-center gap-3 mx-6 md:mx-10 cursor-pointer"
                                >
                                    <span className="font-display text-3xl md:text-5xl lg:text-6xl font-light text-[#2C2A29] group-hover:text-[#A65A4B] transition-colors duration-500">
                                        {m.name}
                                    </span>
                                    <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 stroke-[1.2] text-[#2C2A29]/45 group-hover:text-[#A65A4B] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-500" />
                                    <span className="text-[#2C2A29]/30 font-display text-3xl md:text-5xl lg:text-6xl">
                                        ·
                                    </span>
                                </a>
                            ))}
                        </Marquee>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experiences;
