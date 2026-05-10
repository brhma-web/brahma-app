import React from "react";
import Nav from "@/components/brhma/Nav";
import Hero from "@/components/brhma/Hero";
import About from "@/components/brhma/About";
import Experiences from "@/components/brhma/Experiences";
import Collaborate from "@/components/brhma/Collaborate";
import Footer from "@/components/brhma/Footer";
import AarambhTimeline from "@/components/brhma/AarambhTimeline";
import Products from "@/components/brhma/Proudcts";

const Landing = () => {
    return (
        <main
            data-testid="landing-page"
            className="bg-[#F5F2EB] text-[#2C2A29] overflow-x-hidden"
        >
            <Nav />
            <Hero />
            <About />
            <AarambhTimeline/>
            <Experiences />
            <Collaborate />
            <Products />
            <Footer />
        </main>
    );
};

export default Landing;
