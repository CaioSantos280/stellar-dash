import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CloudSun,
  Sun,
  Cloud,
  CloudRain,
  Snowflake,
  CloudLightning,
} from "lucide-react";

import Card from "../ui/Card";

function getWeatherInfo(code) {
  if (code === 0) return { text: "Céu limpo", icon: Sun, color: "text-yellow-300" };
  if (code <= 3) return { text: "Parcialmente nublado", icon: CloudSun, color: "text-blue-300" };
  if (code <= 48) return { text: "Nublado", icon: Cloud, color: "text-gray-300" };
  if (code <= 67) return { text: "Chuva", icon: CloudRain, color: "text-blue-400" };
  if (code <= 77) return { text: "Neve", icon: Snowflake, color: "text-white" };
  return { text: "Tempestade", icon: CloudLightning, color: "text-purple-300" };
}

async function fetchFallback() {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=-22.9068&longitude=-43.1729&current_weather=true`
  );
  return await res.json();
}

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Carregando...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        let lat = -22.9068;
        let lon = -43.1729;

        await new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              lat = pos.coords.latitude;
              lon = pos.coords.longitude;
              resolve();
            },
            () => resolve(),
            { timeout: 4000 }
          );
        });

        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );

        const data = await res.json();

        setWeather(data?.current_weather || null);
        setCity("Local atual");
      } catch (err) {
        const fallback = await fetchFallback();
        setWeather(fallback?.current_weather || null);
        setCity("Rio de Janeiro");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) {
    return (
      <Card className="h-64 flex items-center justify-center text-white/40">
        Carregando clima...
      </Card>
    );
  }

  const info = weather?.weathercode
    ? getWeatherInfo(weather.weathercode)
    : { text: "Indisponível", icon: CloudSun, color: "text-blue-300" };

  const Icon = info.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="h-64"
    >
      <Card className="h-64">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white/50 text-sm mb-2">
              Current Weather
            </p>

            <h2 className="text-6xl font-bold tracking-tight">
              {weather?.temperature != null
                ? `${Math.round(weather.temperature)}°`
                : "--"}
            </h2>

            <p className="text-white/60 mt-2">
              {city}
            </p>
          </div>

          <div className="
            w-16 h-16 rounded-2xl
            bg-white/10 border border-white/10
            flex items-center justify-center
          ">
            <Icon size={34} className={info.color} />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div>
            <p className="text-white/40 text-sm">
              Condition
            </p>
            <p className="mt-1 font-medium">
              {info.text}
            </p>
          </div>

          <div>
            <p className="text-white/40 text-sm">
              Wind
            </p>
            <p className="mt-1 font-medium">
              {weather?.windspeed != null
                ? `${weather.windspeed} km/h`
                : "--"}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}