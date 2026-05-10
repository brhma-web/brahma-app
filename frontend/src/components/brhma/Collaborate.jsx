import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const LANES = [
    {
        k: "Brand Identity & Creative Design",
        v: "We give consultations plus end-to-end solutions for branding and creative design across multidisciplinary channels.",
    },
    {
        k: "Unique Experiences",
        v: "We curate unique art, cultural and lifestyle experiences — building a space and community for art lovers.",
    },
    {
        k: "Experiential, Lifestyle Products",
        v: "We are coming up with our own products that add a warm, artistic touch to your everyday life.",
    },
];

const Collaborate = () => {
    return (
        <section
            id="collaborate"
            data-testid="collaborate-section"
            className="relative px-6 md:px-10 py-20 md:py-28 border-t border-[#D1C9C1]"
        >
            <div className="mx-auto max-w-[1280px] grid grid-cols-12 gap-8 md:gap-12">
                <div className="col-span-12 md:col-span-3 text-xs uppercase tracking-[0.28em] text-[#7A8B76]">
                    (03) — Collaborate
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
                        className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight max-w-4xl"
                    >
                        We are here to make your every{" "}
                        <em className="italic text-[#A65A4B]">
                            creative endeavour
                        </em>{" "}
                        a better one.
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
                        We love collaborating with brands, artists and
                        individuals who seek and wish to create creative,
                        unique experiences, products or designs that make an
                        impact.
                    </motion.p>

                    <div className="mt-12 grid sm:grid-cols-3 gap-px bg-[#D1C9C1] border border-[#D1C9C1] rounded-sm overflow-hidden">
                        {LANES.map((l, i) => (
                            <motion.div
                                key={l.k}
                                data-testid={`collab-lane-${i}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{
                                    duration: 0.9,
                                    ease: [0.22, 1, 0.36, 1],
                                    delay: 0.15 + i * 0.08,
                                }}
                                className="bg-[#F5F2EB] p-6 md:p-8 hover:bg-[#F0EBE1] transition-colors duration-500"
                            >
                                <div className="text-[11px] uppercase tracking-[0.24em] text-[#2C2A29]/60">
                                    0{i + 1}
                                </div>
                                <h3 className="font-display text-2xl md:text-3xl mt-3 leading-tight">
                                    {l.k}
                                </h3>
                                <p className="mt-3 text-sm text-[#2C2A29]/75 leading-relaxed">
                                    {l.v}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    <a
                        href="mailto:contactbrhma@gmail.com?subject=Collaboration%20with%20Brhma%20Studio&body=Hi%20Brhma%20team%2C%0A%0AI%27d%20love%20to%20pitch%20a%20collaboration%20%E2%80%94%20here%27s%20a%20bit%20about%20me%20and%20what%20I%27m%20thinking%3A%0A%0A"
                        data-testid="collab-cta"
                        className="mt-10 inline-flex items-center gap-2 text-sm link-underline"
                    >
                        Pitch a collaboration
                        <ArrowUpRight className="w-4 h-4 stroke-[1.4]" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Collaborate;
