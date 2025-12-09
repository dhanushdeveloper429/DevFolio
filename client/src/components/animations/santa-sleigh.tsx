import { motion } from "framer-motion";
import { useThemeLogic } from "@/hooks/use-theme-logic";
import { useEffect, useState } from "react";

export function SantaSleigh() {
    const { theme } = useThemeLogic();
    const [isVisible, setIsVisible] = useState(false);

    // Only run animation cycle if it's Christmas theme
    useEffect(() => {
        if (theme !== 'christmas') {
            setIsVisible(false);
            return;
        }

        const interval = setInterval(() => {
            setIsVisible(true);
            // Reset after animation duration (10s)
            setTimeout(() => setIsVisible(false), 10000);
        }, 20000); // Run every 20 seconds

        // Initial run
        setTimeout(() => {
            setIsVisible(true);
            setTimeout(() => setIsVisible(false), 10000);
        }, 2000);

        return () => clearInterval(interval);
    }, [theme]);

    if (!isVisible || theme !== 'christmas') return null;

    return (
        <motion.div
            className="fixed z-50 pointer-events-none"
            initial={{ x: "-100vw", y: "20vh" }}
            animate={{
                x: "100vw",
                y: ["20vh", "30vh", "15vh", "25vh"] // Wavy path
            }}
            transition={{
                duration: 10,
                ease: "linear",
                y: {
                    duration: 10,
                    repeat: 0,
                    ease: "easeInOut"
                }
            }}
        >
            <div className="relative w-64 h-32 opacity-80 text-foreground dark:text-white">
                {/* Santa Sleigh Silhouette SVG */}
                <svg viewBox="0 0 500 200" className="w-full h-full fill-current">
                    {/* Simple representation of reindeer and sleigh */}
                    <path d="M50,120 Q70,100 90,120 T130,120 L140,110 L150,120 M150,120 L200,120 L200,100 L150,100 Z" stroke="currentColor" strokeWidth="2" fill="none" />
                    {/* Reindeers */}
                    <circle cx="40" cy="115" r="5" />
                    <circle cx="70" cy="110" r="5" />
                    <circle cx="100" cy="115" r="5" />
                    {/* Sleigh Body */}
                    <path d="M140,110 C140,140 180,140 190,120 L200,120 L200,100 L150,100 Z" fill="currentColor" />
                    {/* Santa */}
                    <circle cx="170" cy="100" r="10" fill="currentColor" />
                    {/* Runners */}
                    <path d="M140,130 L210,130" stroke="currentColor" strokeWidth="2" />
                </svg>
                <div className="absolute -bottom-4 left-0 w-full text-center text-xs font-bold text-red-500 animate-pulse">
                    Ho! Ho! Ho!
                </div>
            </div>
        </motion.div>
    );
}
