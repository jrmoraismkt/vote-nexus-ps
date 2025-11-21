import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import a1 from "@/assets/a1.png";
import a2 from "@/assets/a2.png";
import a3 from "@/assets/a3.png";
import a4 from "@/assets/a4.png";
import a5 from "@/assets/a5.png";
import { Particles } from "./Particles";

const sponsors = [a1, a2, a3, a4, a5];

interface ScreensaverProps {
  onExit: () => void;
}

export const Screensaver = ({ onExit }: ScreensaverProps) => {
  const [currentSponsor, setCurrentSponsor] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSponsor((prev) => (prev + 1) % sponsors.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-ps-darker via-ps-dark to-ps-darker cursor-pointer"
      onClick={onExit}
    >
      <Particles />
      
      <div className="relative z-10 flex flex-col items-center gap-16 animate-pulse-glow">
        <img
          src={logo}
          alt="Championship Logo"
          className="w-64 h-64 object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.8)]"
        />
        
        <div className="text-center">
          <h1 className="text-5xl font-bold text-foreground neon-text mb-4">
            Seleção da Confraternização 2025
          </h1>
          <p className="text-2xl text-muted-foreground">Toque na tela para votar</p>
        </div>

        <div className="h-48 w-96 flex items-center justify-center">
          {sponsors.map((sponsor, index) => (
            <img
              key={index}
              src={sponsor}
              alt={`Patrocinador ${index + 1}`}
              className={`absolute w-80 h-40 object-contain transition-opacity duration-1000 ${
                currentSponsor === index ? "opacity-100" : "opacity-0"
              }`}
              style={{
                filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
