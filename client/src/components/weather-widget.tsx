import { useWeather } from '@/hooks/use-weather';
import { Cloud, Sun, Snowflake, Thermometer } from "lucide-react";
import { motion } from "framer-motion";

export function WeatherWidget() {
    const { temperature, isSnowing, loading, error } = useWeather();

    if (loading) return null;
    if (error) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-background/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary/20 shadow-lg text-sm font-medium"
            title="Current Weather"
        >
            {isSnowing ? (
                <Snowflake className="w-4 h-4 text-primary animate-pulse" />
            ) : temperature > 20 ? (
                <Sun className="w-4 h-4 text-orange-500 animate-spin-slow" />
            ) : (
                <Cloud className="w-4 h-4 text-gray-400" />
            )}
            <span>{temperature}°C</span>
        </motion.div>
    );
}
