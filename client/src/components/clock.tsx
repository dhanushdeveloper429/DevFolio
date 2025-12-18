import { useState, useEffect } from "react";

export function Clock() {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (!time) return null;

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    const secondDegrees = (seconds / 60) * 360;
    const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
    const hourDegrees = ((hours % 12 + minutes / 60) / 12) * 360;

    return (
        <div className="hidden md:block relative w-10 h-10 ml-4 group cursor-pointer" title={time.toLocaleTimeString()}>
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 rounded-full border border-primary/30 dark:border-cyan-400/30 shadow-[0_0_10px_rgba(59,130,246,0.2)] dark:shadow-[0_0_10px_rgba(0,255,255,0.2)] bg-background/50 backdrop-blur-sm"></div>

            {/* Clock Face SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {/* Hour Hand */}
                <line
                    x1="50"
                    y1="50"
                    x2="80"
                    y2="50"
                    className="stroke-primary dark:stroke-cyan-400 stroke-[4]"
                    strokeLinecap="round"
                    style={{ transform: `rotate(${hourDegrees}deg)`, transformOrigin: "50% 50%" }}
                />
                {/* Minute Hand */}
                <line
                    x1="50"
                    y1="50"
                    x2="90"
                    y2="50"
                    className="stroke-foreground/80 stroke-[3]"
                    strokeLinecap="round"
                    style={{ transform: `rotate(${minuteDegrees}deg)`, transformOrigin: "50% 50%" }}
                />
                {/* Second Hand */}
                <line
                    x1="50"
                    y1="50"
                    x2="90"
                    y2="50"
                    className="stroke-red-500/80 stroke-[1]"
                    strokeLinecap="round"
                    style={{ transform: `rotate(${secondDegrees}deg)`, transformOrigin: "50% 50%" }}
                />
                {/* Center Dot */}
                <circle cx="50" cy="50" r="3" className="fill-primary dark:fill-cyan-400" />
            </svg>
        </div>
    );
}
