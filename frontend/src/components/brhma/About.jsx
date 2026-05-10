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
                        <span className="text-[#A65A4B]">Brhma</span> is a
                        multidisciplinary design studio curating an art space
                        and community in India, with a strong presence in
                        Indore.
                    </p>
                    <p>
                        We craft{" "}
                        <em className="italic">unique artistic, cultural,</em>{" "}
                        social and lifestyle experiences that bring like-minded
                        individuals together through engaging, immersive,
                        meaningful activities.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
