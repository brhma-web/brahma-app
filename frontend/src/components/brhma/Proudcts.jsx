import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";

// Placeholder image pools — swap with real product photography when ready.
const METAL_IMG1 = "/assets/metal-muse-1_result.png";
const METAL_IMG2= "/assets/metal-muse-3_result.png";
const METAL_IMG3 = "/assets/metal-muse-2_result.png";
const MANDALA_IMG1 = "/assets/Mandala-art-1_result.png";
const MANDALA_IMG2= "/assets/Mandala-art-2_result.png";
const MANDALA_IMG3 = "/assets/Mandala-art-3_result.png";
const CYANOTYPE_IMG1 = "/assets/Cyanotype1_result.JPEG";
const CYANOTYPE_IMG2 = "/assets/Cyanotype2_result.png";
const CYANOTYPE_IMG3 = "/assets/Cyanotype3_result.png";

const PRODUCTS = [
    {
        id: "metal-muse-kit",
        name: "Metal Muse Experience Kit",
        sub: "DIY · guided · fun",
        price: "₹ 1,499",
        blurb:
            "Bring the Metal Muse studio home. A complete, step-by-step kit to try metal embossing on aluminium and copper sheets — everything you need to coax raised motifs out of metal with your own hands. Designed for first-timers, generous enough for repeat sessions.",
        included: [
            "1 mm aluminium sheets · 5 nos.",
            "Copper foil sheet · 2 nos.",
            "Stylus & embossing tools · set of 4",
            "Pre-printed motif templates · 6 designs",
            "Foam mat, tracing paper, masking tape",
            "Hand-folded instruction zine",
        ],
        cover: METAL_IMG2,
        images: [METAL_IMG1, METAL_IMG2 ,METAL_IMG3],
    },
    {
        id: "cyanotype-memoir",
        name: "Cyanotype Memoir",
        sub: "timeless · custom · gifting",
        price: "₹ 2,499",
        blurb:
            "A bespoke cyanotype keepsake — your photograph or sketch, hand-printed on cotton paper using sunlight and Prussian blue chemistry. Each print is one of one, signed and dated. Made to last decades, made to be gifted.",
        included: [
            "Hand-printed cyanotype · 8\" × 10\"",
            "Acid-free, archival cotton paper",
            "Signed by the studio printer",
            "Optional walnut frame add-on",
            "Wrapped in handmade paper sleeve",
            "Personal note card",
        ],
        cover: CYANOTYPE_IMG3,
        images: [ CYANOTYPE_IMG1, CYANOTYPE_IMG2, CYANOTYPE_IMG3],
    },
    {
        id: "art-therapy-mandala",
        name: "Art Therapy — Mandala Colouring Book",
        sub: "relaxing · DIY · fun",
        price: "₹ 799",
        blurb:
            "An unhurried colouring book of original mandalas, designed in-house at Brhma. Perforated pages, generous margins and a paper that drinks colour beautifully. Made for slow afternoons, quiet evenings and anyone who needs to think a little less.",
        included: [
            "60 unique mandala illustrations",
            "Perforated, frame-ready pages",
            "Smooth 200 gsm uncoated paper",
            "Lay-flat thread binding",
            "Studio-printed, locally bound in Indore",
            "Gift wrap on request",
        ],
        cover: MANDALA_IMG1,
        images: [ MANDALA_IMG1, MANDALA_IMG2, MANDALA_IMG3],
    },
];

const waLink = (productName) =>
    `https://wa.me/919424540459?text=${encodeURIComponent(
        `Hey! I'm interested in this '${productName}' product.`
    )}`;

const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden
        fill="currentColor"
    >
        <path d="M19.077 4.928A9.94 9.94 0 0 0 12.011 2C6.474 2 1.984 6.49 1.984 12.027c0 1.768.46 3.495 1.336 5.014L2 22l5.07-1.296a10 10 0 0 0 4.94 1.255h.005c5.535 0 10.026-4.49 10.026-10.027a9.94 9.94 0 0 0-2.964-7.004M12.014 20.255h-.004a8.32 8.32 0 0 1-4.245-1.163l-.305-.18-3.012.77.802-2.93-.198-.31a8.3 8.3 0 0 1-1.27-4.42c0-4.6 3.745-8.345 8.358-8.345 2.231 0 4.328.87 5.905 2.448a8.3 8.3 0 0 1 2.448 5.906c-.001 4.6-3.747 8.224-8.479 8.224m4.589-6.169c-.252-.126-1.487-.733-1.717-.816-.23-.083-.397-.126-.564.126-.167.252-.646.815-.793.982-.146.168-.293.189-.544.063-.252-.126-1.062-.391-2.024-1.249-.748-.667-1.253-1.491-1.4-1.743-.146-.252-.016-.388.11-.514.113-.112.252-.293.378-.44.126-.146.168-.252.252-.42.084-.168.042-.314-.021-.44-.063-.126-.564-1.36-.773-1.862-.204-.49-.41-.424-.564-.432-.146-.007-.314-.009-.481-.009a.92.92 0 0 0-.668.314c-.23.252-.879.86-.879 2.094s.9 2.428 1.025 2.595c.126.168 1.77 2.703 4.288 3.79.6.26 1.067.413 1.432.529.601.191 1.149.164 1.581.099.483-.072 1.487-.608 1.696-1.195.21-.587.21-1.09.147-1.196-.063-.106-.23-.168-.481-.293" />
    </svg>
);

const ProductDialog = ({ open, onOpenChange, product }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selected, setSelected] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelected(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
    }, [emblaApi, onSelect]);

    if (!product) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                data-testid={`product-dialog-${product.id}`}
                className="!max-w-5xl w-[96vw] p-0 bg-[#F5F2EB] border-[#D1C9C1] text-[#2C2A29] overflow-hidden rounded-sm max-h-[92vh]"
            >
                <DialogTitle className="sr-only">{product.name}</DialogTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 md:h-[92vh]">
                    {/* Carousel */}
                    <div className="relative bg-[#F0EBE1] border-b md:border-b-0 md:border-r border-[#D1C9C1]">
                        <div className="overflow-hidden h-[42vh] md:h-[92vh]" ref={emblaRef}>
                            <div className="flex h-full">
                                {product.images.map((src, idx) => (
                                    <div
                                        key={idx}
                                        className="shrink-0 grow-0 basis-full h-full"
                                    >
                                        <img
                                            src={src}
                                            alt={`${product.name} ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* arrows */}
                        <button
                            type="button"
                            onClick={() => emblaApi && emblaApi.scrollPrev()}
                            aria-label="Previous image"
                            data-testid="product-img-prev"
                            className="absolute top-1/2 left-3 -translate-y-1/2 w-9 h-9 rounded-full bg-[#F5F2EB]/85 backdrop-blur border border-[#D1C9C1] flex items-center justify-center hover:bg-[#2C2A29] hover:text-[#F5F2EB] transition-colors"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => emblaApi && emblaApi.scrollNext()}
                            aria-label="Next image"
                            data-testid="product-img-next"
                            className="absolute top-1/2 right-3 -translate-y-1/2 w-9 h-9 rounded-full bg-[#F5F2EB]/85 backdrop-blur border border-[#D1C9C1] flex items-center justify-center hover:bg-[#2C2A29] hover:text-[#F5F2EB] transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* dots */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                            {product.images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                                    aria-label={`Go to image ${idx + 1}`}
                                    className={`h-1.5 rounded-full transition-all ${
                                        selected === idx
                                            ? "w-6 bg-[#2C2A29]"
                                            : "w-1.5 bg-[#2C2A29]/30"
                                    }`}
                                />
                            ))}
                        </div>

                        <div className="absolute top-3 left-3 bg-[#F5F2EB]/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.24em]">
                            {selected + 1} / {product.images.length}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="p-7 md:p-10 flex flex-col overflow-y-auto max-h-[50vh] md:max-h-[92vh]">
                        <div className="text-[10px] uppercase tracking-[0.28em] text-[#7A8B76]">
                            Product
                        </div>
                        <h3 className="mt-2 font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.05] tracking-tight">
                            {product.name}
                        </h3>
                        <div className="mt-3 text-[11px] uppercase tracking-[0.22em] text-[#2C2A29]/65">
                            ( {product.sub} )
                        </div>

                        <p className="mt-6 text-[#2C2A29]/80 leading-relaxed">
                            {product.blurb}
                        </p>

                        <div className="mt-7 pt-5 border-t border-[#2C2A29]/15">
                            <div className="text-[10px] uppercase tracking-[0.24em] text-[#2C2A29]/55 mb-3">
                                What's inside
                            </div>
                            <ul className="grid grid-cols-1 gap-y-1.5 text-sm text-[#2C2A29]/80">
                                {product.included.map((it) => (
                                    <li
                                        key={it}
                                        className="flex items-start gap-2.5"
                                    >
                                        <span className="mt-2 inline-block w-1.5 h-1.5 rounded-full bg-[#A65A4B]" />
                                        <span>{it}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-7 pt-5 border-t border-[#2C2A29]/15 flex items-baseline justify-between gap-4">
                            <div>
                                <div className="text-[10px] uppercase tracking-[0.24em] text-[#2C2A29]/55">
                                    Price
                                </div>
                                <div className="font-display text-3xl md:text-4xl mt-1">
                                    {product.price}
                                </div>
                            </div>
                            <div className="text-[10px] uppercase tracking-[0.22em] text-[#2C2A29]/55 max-w-[160px] text-right leading-relaxed">
                                Ships pan-India · made to order
                            </div>
                        </div>

                        <a
                            href={waLink(product.name)}
                            target="_blank"
                            rel="noreferrer"
                            data-testid={`product-buy-${product.id}`}
                            className="mt-7 inline-flex items-center justify-center gap-3 px-6 py-4 rounded-full text-sm font-medium tracking-wide text-white bg-[#1FAE54] hover:bg-[#188F44] transition-colors duration-300 shadow-sm"
                        >
                            <WhatsAppIcon className="w-5 h-5" />
                            Book on WhatsApp
                            <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                        </a>

                        <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#2C2A29]/50">
                            Opens a chat with our studio · +91 94245 40459
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const Products = () => {
    const [openId, setOpenId] = useState(null);
    const active = PRODUCTS.find((p) => p.id === openId) || null;

    return (
        <section
            id="products"
            data-testid="products-section"
            className="relative px-6 md:px-10 py-20 md:py-28 border-t border-[#D1C9C1]"
        >
            <div className="mx-auto max-w-[1280px]">
                <div className="grid grid-cols-12 gap-8 md:gap-12">
                    <div className="col-span-12 md:col-span-3 text-xs uppercase tracking-[0.28em] text-[#7A8B76]">
                        (04) — Studio Products
                    </div>
                    <div className="col-span-12 md:col-span-9">
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.05] tracking-tight">
                            A handful of objects we've{" "}
                            <em className="italic text-[#A65A4B]">
                                made for keeping
                            </em>
                            .
                        </h2>
                        <p className="mt-4 max-w-xl text-[#2C2A29]/70 leading-relaxed">
                            Small batch, made to order, shipped from Indore. Tap
                            any product to see more, then book on WhatsApp.
                        </p>
                    </div>
                </div>

                <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {PRODUCTS.map((p, i) => (
                        <motion.button
                            key={p.id}
                            type="button"
                            data-testid={`product-card-${p.id}`}
                            onClick={() => setOpenId(p.id)}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{
                                duration: 0.9,
                                delay: i * 0.08,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="group text-left flex flex-col"
                        >
                            <div className="relative overflow-hidden rounded-sm border border-[#D1C9C1] bg-[#F0EBE1] aspect-[4/5]">
                                <img
                                    src={p.cover}
                                    alt={p.name}
                                    className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.05]"
                                    loading="lazy"
                                />
                                <span className="absolute top-3 left-3 bg-[#F5F2EB]/90 backdrop-blur px-3 py-1 text-[10px] uppercase tracking-[0.24em]">
                                    0{i + 1}
                                </span>
                                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-[#F5F2EB]/90 backdrop-blur px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    View details
                                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.4]" />
                                </span>
                            </div>
                            <h3 className="mt-5 font-display text-2xl md:text-3xl leading-tight tracking-tight group-hover:text-[#A65A4B] transition-colors duration-300">
                                {p.name}
                            </h3>
                            <div className="mt-1.5 text-[11px] uppercase tracking-[0.22em] text-[#2C2A29]/60">
                                ( {p.sub} )
                            </div>
                            <div className="mt-3 flex items-baseline justify-between">
                                <span className="font-display text-lg">
                                    {p.price}
                                </span>
                                <span className="text-[10px] uppercase tracking-[0.24em] text-[#A65A4B] link-underline">
                                    View &amp; book
                                </span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            <ProductDialog
                open={!!openId}
                onOpenChange={(v) => !v && setOpenId(null)}
                product={active}
            />
        </section>
    );
};

export default Products;
