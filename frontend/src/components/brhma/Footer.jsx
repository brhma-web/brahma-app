import React, { useEffect, useState } from "react";
import { Instagram, Youtube, MessageCircle, ArrowUpRight } from "lucide-react";
import LetsBreakIceDialog from "@/components/brhma/LetsBreakIceDialog";

const LINKS = [
    {
        id: "instagram",
        label: "Instagram",
        handle: "@brhma.in",
        href: "https://www.instagram.com/brhma.in/",
        Icon: Instagram,
    },
    {
        id: "youtube",
        label: "YouTube",
        handle: "@BRHMA.ब्रह्मा",
        href: "https://www.youtube.com/@BRHMA.ब्रह्मा",
        Icon: Youtube,
    },
    {
        id: "whatsapp",
        label: "WhatsApp",
        handle: "+91 94245 40459",
        href: "https://wa.me/919424540459",
        Icon: MessageCircle,
    },
];

const Footer = () => {
    const [time, setTime] = useState("");

    useEffect(() => {
        const tick = () => {
            const d = new Date();
            const hh = String(d.getHours()).padStart(2, "0");
            const mm = String(d.getMinutes()).padStart(2, "0");
            const ss = String(d.getSeconds()).padStart(2, "0");
            setTime(`${hh}:${mm}:${ss}`);
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const year = new Date().getFullYear();

    return (
        <footer
            id="contact"
            data-testid="footer"
            className="relative px-6 md:px-10 pt-20 md:pt-28 pb-10 border-t border-[#D1C9C1]"
        >
            <div className="mx-auto max-w-[1280px]">
                <div className="grid grid-cols-12 gap-8 md:gap-12">
                    <div className="col-span-12 md:col-span-3 text-xs uppercase tracking-[0.28em] text-[#7A8B76]">
                        (04) — Let's Break Ice
                    </div>
                    <div className="col-span-12 md:col-span-9">
                        <h2
                            data-testid="contact-title"
                            className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-light leading-[1] tracking-tight"
                        >
                            Say hi, send a note,{" "}
                            <em className="italic text-[#A65A4B]">
                                or just tell us what you're making.
                            </em>
                        </h2>

                        <LetsBreakIceDialog
                            trigger={
                                <button
                                    data-testid="ice-break-cta"
                                    className="mt-10 inline-flex items-center gap-3 px-6 py-3 border border-[#2C2A29] rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[#2C2A29] hover:text-[#F5F2EB] transition-colors duration-500"
                                >
                                    Let's Break Ice
                                    <ArrowUpRight className="w-4 h-4 stroke-[1.4]" />
                                </button>
                            }
                        />

                        <div className="mt-14 grid sm:grid-cols-3 gap-6 md:gap-8">
                            {LINKS.map(({ id, label, handle, href, Icon }) => (
                                <a
                                    key={id}
                                    data-testid={`contact-${id}`}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="group flex items-center gap-4 py-4 border-t border-[#2C2A29]/20 hover:border-[#A65A4B] transition-colors"
                                >
                                    <Icon className="w-4 h-4 stroke-[1.4]" />
                                    <div className="flex-1">
                                        <div className="text-[10px] uppercase tracking-[0.24em] text-[#2C2A29]/55">
                                            {label}
                                        </div>
                                        <div className="text-sm group-hover:text-[#A65A4B] transition-colors">
                                            {handle}
                                        </div>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 stroke-[1.4] text-[#2C2A29]/50 group-hover:text-[#A65A4B] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-20 pt-6 border-t border-[#D1C9C1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] uppercase tracking-[0.22em] text-[#2C2A29]/60">
                    <div className="flex items-center gap-4">
                        <span className="tabular-nums">{time}</span>
                        <span className="text-[#2C2A29]/30">·</span>
                        <span>Indore, India</span>
                    </div>
                    <div className="italic normal-case tracking-normal text-[#2C2A29]/55">
                        "of form, of feeling, of hand."
                    </div>
                    <div>© {year} Brhma Studio</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
