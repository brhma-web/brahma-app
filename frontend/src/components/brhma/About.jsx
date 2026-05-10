import React from "react";
import { motion } from "framer-motion";

const About = () => {
    return (
        <section
            id="about"
            data-testid="about-section"
            className="relative mx-5 md:px-10 py-20 md:py-28 border-t border-[#D1C9C1]"
        >
            <div className="mx-auto max-w-[1280px] grid grid-cols-12 gap-8 md:gap-12">
                <div className="col-span-12 md:col-span-3 text-xs uppercase tracking-[0.28em] text-[#7A8B76]">
                    (01) — About
                </div>
                <motion.div
                    data-testid="about-body"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="col-span-12 md:col-span-9 font-display text-3xl md:text-4xl lg:text-[2.75rem] font-light leading-[1.2] tracking-tight space-y-8"
                >
                    <p>
                        <span className="text-[#A65A4B]">Brhma</span> is a multidisciplinary design
                         studio shaping artistic and cultural 
                        experiences in India.
                    </p>
                    <p>
                        Based in Indore{" "}
                        <em className="italic"> BRHMA curates immersive workshops,</em>{" "}
                        creative gatherings, installations, and experience-led conscious products.
                         They merge art, culture, design, and community into thoughtful contemporary experiences, creating spaces for
                         meaningful human connections. 
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
