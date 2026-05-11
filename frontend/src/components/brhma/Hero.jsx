import React from "react";
import { motion } from "framer-motion";

const HERO_IMG =
    "/assets/homeimg(1).png";

const Hero = () => {
    return (
        <section
            data-testid="hero-section"
            className="relative px-6 md:px-10 pt-12 md:pt-20 pb-24 md:pb-32"
        >
            <div className="mx-auto max-w-[1280px]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-baseline gap-3 text-[13px] text-[#2C2A29]/65 mb-8"
                >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#A65A4B] animate-pulse" />
                    <span className="tracking-wide">
                        Currently — open to collaborations &amp; commissions
                    </span>
                </motion.div>

                <motion.h1
                    data-testid="hero-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.1,
                    }}
                    className="font-display font-light leading-[1.02] tracking-tight text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] max-w-5xl"
                >
                     A multidisciplinary design studio{" "}
                    <em className="italic text-[#A65A4B]">
                        building a community through art,
                    </em>
                   culture, and creative exploration.  
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.25,
                    }}
                    className="mt-16 md:mt-20 relative overflow-hidden rounded-sm border border-[#D1C9C1] group"
                >
                    <a href="https://www.instagram.com/reel/DXrIJ-UDmOS/?igsh=MTk3ZmM4a2JibzdwOA==">
                      <img
                        src={HERO_IMG}
                        alt="Vision Board Session at Brhma studio, Indore"
                        className="w-full h-[55vh] md:h-[72vh] object-cover transition-transform duration-[1600ms] group-hover:scale-[1.03]"
                    />
                    </a>
                  
                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-[#F5F2EB]/90 backdrop-blur px-3 py-1.5 text-[10px] uppercase tracking-[0.24em]">
                        Dib bangkok - Feature
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
