import { useState, useEffect } from 'react';

interface WeatherData {
    isSnowing: boolean;
    temperature: number;
    loading: boolean;
    error: string | null;
}

export function useWeather() {
    const [data, setData] = useState<WeatherData>({
        isSnowing: false,
        temperature: 0,
        loading: true,
        error: null,
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setData(prev => ({ ...prev, loading: false, error: 'Geolocation not supported' }));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
                    );
                    const weather = await response.json();

                    // WMO Weather interpretation codes (ww)
                    // 71, 73, 75: Snow fall
                    // 77: Snow grains
                    // 85, 86: Snow showers
                    const snowCodes = [71, 73, 75, 77, 85, 86];
                    const isSnowing = snowCodes.includes(weather.current_weather.weathercode);

                    setData({
                        isSnowing,
                        temperature: weather.current_weather.temperature,
                        loading: false,
                        error: null,
                    });
                } catch (err) {
                    setData(prev => ({ ...prev, loading: false, error: 'Failed to fetch weather' }));
                }
            },
            (error) => {
                setData(prev => ({ ...prev, loading: false, error: error.message }));
            }
        );
    }, []);

    return data;
}
