import React from "react";
import LetsBreakIceDialog from "@/components/brhma/LetsBreakIceDialog";

const LOGO_URL = "/assets/brhma-logo_result.png";

const Nav = () => {
    return (
        <header
            data-testid="nav-header"
            className="sticky top-0 z-50 bg-[#F5F2EB]/90 backdrop-blur-sm"
        >
            <div className="mx-auto max-w-[1280px] px-6 md:px-10 py-5 flex items-center justify-between text-sm">
                <button
                    data-testid="nav-logo"
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="flex items-center group"
                >
                    <img
                        src={LOGO_URL}
                        alt="Brhma"
                        className="h-[84px] w-[84px] md:h-[120px] md:w-[120px] object-contain"
                    />
                </button>

                <div className="hidden md:flex items-center gap-10 text-[13px] text-[#2C2A29]/70">
                    <span className="tracking-wide">
                        A Multidisciplinary Design Studio
                    </span>
                </div>

                <div className="flex items-center gap-4 text-[12px] text-[#2C2A29]/70">
                    <span className="hidden sm:inline">Indore, IN</span>
                    <LetsBreakIceDialog
                        trigger={
                            <button
                                data-testid="nav-cta"
                                className="ml-2 inline-flex items-center gap-2 px-4 py-1.5 border border-[#2C2A29] rounded-full text-[11px] uppercase tracking-[0.18em] hover:bg-[#2C2A29] hover:text-[#F5F2EB] transition-colors duration-500"
                            >
                                Contact
                            </button>
                        }
                    />
                </div>
            </div>
        </header>
    );
};

export default Nav;
