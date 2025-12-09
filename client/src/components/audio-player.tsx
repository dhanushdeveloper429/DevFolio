import { useState, useEffect, useRef } from "react";
import { Music, VolumeX, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeLogic } from "@/hooks/use-theme-logic";

export function FestiveAudio() {
    const { theme } = useThemeLogic();
    const [isPlaying, setIsPlaying] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const isPlayingRef = useRef(false);

    useEffect(() => {
        // Only available in Christmas and Halloween themes? 
        // Plan said "Festive Audio", implies Christmas. Let's start with Christmas.
        if (theme !== 'christmas') {
            stopMusic();
        }
    }, [theme]);

    const playNote = (freq: number, duration: number, type: OscillatorType = 'sine') => {
        if (!audioContextRef.current) return;
        const ctx = audioContextRef.current;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    };

    const playJingleBells = async () => {
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') {
            await ctx.resume();
        }

        const notes = [
            // E E E
            { f: 329.63, d: 0.2, w: 0.2 }, { f: 329.63, d: 0.2, w: 0.2 }, { f: 329.63, d: 0.4, w: 0.4 },
            // E E E
            { f: 329.63, d: 0.2, w: 0.2 }, { f: 329.63, d: 0.2, w: 0.2 }, { f: 329.63, d: 0.4, w: 0.4 },
            // E G C D E
            { f: 329.63, d: 0.2, w: 0.2 }, { f: 392.00, d: 0.2, w: 0.2 }, { f: 261.63, d: 0.2, w: 0.2 }, { f: 293.66, d: 0.1, w: 0.1 }, { f: 329.63, d: 0.8, w: 0.8 },
        ];

        let noteIndex = 0;

        const playNext = () => {
            if (!isPlayingRef.current) return;

            const note = notes[noteIndex];
            playNote(note.f, note.d, 'triangle'); // Triangle wave for a "chiptune" holiday feel

            noteIndex = (noteIndex + 1) % notes.length;

            // Add a small pause between loops if at end
            const delay = noteIndex === 0 ? 1000 : note.w * 1000;

            setTimeout(playNext, delay);
        };

        isPlayingRef.current = true;
        playNext();
    };

    const toggleMusic = () => {
        if (isPlaying) {
            stopMusic();
        } else {
            setIsPlaying(true);
            playJingleBells();
        }
    };

    const stopMusic = () => {
        setIsPlaying(false);
        isPlayingRef.current = false;
        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
    };

    if (theme !== 'christmas') return null;

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Button
                onClick={toggleMusic}
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 bg-background/80 backdrop-blur border-red-500 hover:bg-red-500/20 text-red-500 shadow-lg animate-in fade-in zoom-in duration-300"
            >
                {isPlaying ? <Volume2 className="h-6 w-6" /> : <Music className="h-6 w-6" />}
            </Button>
        </div>
    );
}
