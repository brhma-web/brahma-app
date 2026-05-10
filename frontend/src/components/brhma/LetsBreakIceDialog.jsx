import React, { useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowUpRight, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const baseURL = process.env.REACT_APP_BACKEND_URL || "";
const API = `${baseURL.replace(/\/$/, "")}/api`;

const countWords = (s) =>
    s
        .trim()
        .split(/\s+/)
        .filter(Boolean).length;

const LetsBreakIceDialog = ({ trigger }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const words = useMemo(() => countWords(message), [message]);
    const wordStatus =
        words === 0 ? "idle" : words > 100 ? "long" : "ok";

    const reset = () => {
        setName("");
        setPhone("");
        setMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) return toast.error("Please enter your name");
        if (!/^[\d\s()+\-]{6,30}$/.test(phone.trim()))
            return toast.error("Please enter a valid phone number");
        if (!message.trim()) return toast.error("Please add a short note");
        if (words < 1) return toast.error("Please enter a message");
        if (words > 100)
            return toast.error("Message must be 100 words or fewer");
        setSubmitting(true);
        try {
            await axios.post(`${API}/leads`, {
                name: name.trim(),
                phone: phone.trim(),
                message: message.trim(),
            });
            toast.success("Thank you — we'll be in touch soon.");
            reset();
            setOpen(false);
        } catch (err) {
            const detail =
                err?.response?.data?.detail?.[0]?.msg ||
                err?.response?.data?.detail ||
                "Something went wrong. Please try again.";
            toast.error(typeof detail === "string" ? detail : "Please review your entries.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent
                data-testid="ice-break-dialog"
                className="max-w-xl bg-[#F5F2EB] border-[#D1C9C1] text-[#2C2A29] p-8 md:p-10 rounded-sm"
            >
                <DialogHeader className="text-left">
                    <DialogTitle asChild>
                        <h2 className="font-display text-3xl md:text-4xl font-light leading-tight tracking-tight">
                            Let's <em className="italic text-[#A65A4B]">break ice</em>.
                        </h2>
                    </DialogTitle>
                    <DialogDescription className="text-[#2C2A29]/70 text-sm mt-2">
                        Leave us a note — tell us who you are and what you're
                        making. We read every message.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="mt-2 flex flex-col gap-5"
                    data-testid="ice-break-form"
                >
                    <div>
                        <label className="text-[10px] uppercase tracking-[0.24em] text-[#2C2A29]/60">
                            Name
                        </label>
                        <input
                            data-testid="lead-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            className="mt-2 w-full bg-transparent border-b border-[#2C2A29]/25 focus:border-[#A65A4B] outline-none py-2 text-base font-body placeholder:text-[#2C2A29]/30 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="text-[10px] uppercase tracking-[0.24em] text-[#2C2A29]/60">
                            Phone Number
                        </label>
                        <input
                            data-testid="lead-phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98XXXXXXXX"
                            className="mt-2 w-full bg-transparent border-b border-[#2C2A29]/25 focus:border-[#A65A4B] outline-none py-2 text-base font-body placeholder:text-[#2C2A29]/30 transition-colors"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] uppercase tracking-[0.24em] text-[#2C2A29]/60">
                                Your Note
                            </label>
                            <span
                                data-testid="lead-wordcount"
                                className={`text-[10px] tracking-[0.2em] uppercase ${
                                    wordStatus === "long"
                                        ? "text-[#A65A4B]"
                                        : wordStatus === "ok"
                                            ? "text-[#7A8B76]"
                                            : "text-[#2C2A29]/40"
                                }`}
                            >
                                {words} / 100 words max
                            </span>
                        </div>
                        <textarea
                            data-testid="lead-message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            rows={5}
                            placeholder="Tell us a little about yourself and what you'd like to talk about (up to 100 words)."
                            className="mt-2 w-full bg-transparent border-b border-[#2C2A29]/25 focus:border-[#A65A4B] outline-none py-2 text-base font-body placeholder:text-[#2C2A29]/30 transition-colors resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        data-testid="lead-submit"
                        disabled={submitting}
                        className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#2C2A29] rounded-full text-xs uppercase tracking-[0.2em] hover:bg-[#2C2A29] hover:text-[#F5F2EB] transition-colors duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Sending…
                            </>
                        ) : (
                            <>
                                Send Note
                                <ArrowUpRight className="w-4 h-4 stroke-[1.4]" />
                            </>
                        )}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default LetsBreakIceDialog;
