import { useEffect } from "react";
import "@/App.css";
import Landing from "@/pages/Landing";
import { Toaster } from "@/components/ui/sonner";

function App() {
    useEffect(() => {
        let lenis;
        let rafId;
        (async () => {
            const Lenis = (await import("lenis")).default;
            lenis = new Lenis({
                duration: 1.3,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
            });
            const raf = (time) => {
                lenis.raf(time);
                rafId = requestAnimationFrame(raf);
            };
            rafId = requestAnimationFrame(raf);
        })();
        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            if (lenis) lenis.destroy();
        };
    }, []);

    return (
        <div className="App">
            <Landing />
            <Toaster position="bottom-right" richColors closeButton />
        </div>
    );
}

export default App;
