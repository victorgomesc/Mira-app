"use client";

import { useEffect, useState } from "react";
import { Cloud, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

type Weather = {
  temperature: number;
  windspeed: number;
};

export function MiraDashboard() {
  const [now, setNow] = useState(new Date());
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );

      const data = await response.json();

      setWeather({
        temperature: data.current_weather.temperature,
        windspeed: data.current_weather.windspeed,
      });
    });
  }, []);

  const formattedDate = now.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formattedTime = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-foreground">
      <section className="w-full max-w-5xl rounded-3xl border bg-card p-8 shadow-sm">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Mira
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Sua central de produtividade
            </h1>

            <p className="mt-2 capitalize text-muted-foreground">
              {formattedDate}
            </p>
          </div>

          <div className="rounded-2xl border bg-background px-6 py-4 text-right">
            <p className="text-sm text-muted-foreground">Hora atual</p>
            <p className="text-3xl font-bold">{formattedTime}</p>
          </div>
        </div>

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-background p-5">
            <p className="text-sm text-muted-foreground">Clima</p>

            <div className="mt-3 flex items-center gap-3">
              <Cloud className="h-8 w-8" />

              {weather ? (
                <div>
                  <p className="text-2xl font-bold">
                    {weather.temperature}°C
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Vento: {weather.windspeed} km/h
                  </p>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Permita sua localização
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border bg-background p-5">
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="mt-3 text-2xl font-bold">
              {isRunning ? "Focado" : "Pausado"}
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-5">
            <p className="text-sm text-muted-foreground">Sessão</p>
            <p className="mt-3 text-2xl font-bold">Produtividade</p>
          </div>
        </div>

        <div className="flex flex-col items-center rounded-3xl border bg-background p-10">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Timer
          </p>

          <h2 className="text-7xl font-black tracking-tight md:text-9xl">
            {formatTimer(seconds)}
          </h2>

          <div className="mt-8 flex gap-3">
            <Button size="lg" onClick={() => setIsRunning(!isRunning)}>
              {isRunning ? (
                <>
                  <Pause className="mr-2 h-4 w-4" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Iniciar
                </>
              )}
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                setSeconds(0);
                setIsRunning(false);
              }}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Resetar
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}