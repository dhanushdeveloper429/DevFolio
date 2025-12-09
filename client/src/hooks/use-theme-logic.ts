import { useState, useEffect } from 'react';
import { useWeather } from './use-weather';

export type ThemeType = 'standard' | 'halloween' | 'thanksgiving' | 'christmas';
export type ModeType = 'light' | 'dark';

interface ThemeLogic {
    theme: ThemeType;
    mode: ModeType;
    isSnowing: boolean;
}

export function useThemeLogic(): ThemeLogic {
    const { isSnowing } = useWeather();
    const [theme, setTheme] = useState<ThemeType>('standard');
    const [mode, setMode] = useState<ModeType>('light');

    useEffect(() => {
        const checkTimeAndSeason = () => {
            const now = new Date();
            const month = now.getMonth(); // 0-11
            const hour = now.getHours();

            // Time Logic (6 AM - 6 PM is Light Mode)
            if (hour >= 6 && hour < 18) {
                setMode('light');
                document.documentElement.classList.remove('dark');
            } else {
                setMode('dark');
                document.documentElement.classList.add('dark');
            }

            // Seasonal Logic
            if (month === 9) { // October
                setTheme('halloween');
            } else if (month === 10) { // November
                setTheme('thanksgiving');
            } else if (month === 11) { // December
                setTheme('christmas');
            } else {
                setTheme('standard');
            }
        };

        checkTimeAndSeason();
        const interval = setInterval(checkTimeAndSeason, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []);

    return { theme, mode, isSnowing };
}
