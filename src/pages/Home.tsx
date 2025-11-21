import { useNavigate } from "react-router-dom";
import { PsButton } from "@/components/ui/ps-button";
import { Particles } from "@/components/Particles";
import { Play, Settings } from "lucide-react";
import logo from "@/assets/logo.png";
import a1 from "@/assets/a1.png";
import a2 from "@/assets/a2.png";
import a3 from "@/assets/a3.png";
import a4 from "@/assets/a4.png";
import a5 from "@/assets/a5.png";

const sponsors = [
  { img: a1, delay: 0 },
  { img: a2, delay: 1 },
  { img: a3, delay: 2 },
  { img: a4, delay: 3 },
  { img: a5, delay: 4 },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <Particles />

      {/* Settings Button */}
      <button
        onClick={() => navigate("/admin")}
        className="absolute top-8 right-8 z-20 p-4 glass-morphism rounded-full hover:scale-110 transition-transform"
      >
        <Settings className="w-6 h-6 text-ps-cyan" />
      </button>

      <div className="relative z-10 flex flex-col items-center gap-12 max-w-4xl px-8">
        {/* Logo */}
        <div className="relative">
          <div className="absolute inset-0 bg-ps-blue/30 blur-3xl rounded-full" />
          <img
            src={logo}
            alt="Championship Logo"
            className="w-80 h-80 object-contain relative z-10 animate-pulse-glow"
          />
        </div>

        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-black text-foreground neon-text tracking-wider">
            Seleção da Confraternização
          </h1>
          <h2 className="text-5xl font-bold text-ps-cyan">2025</h2>
        </div>

        {/* Floating Sponsors */}
        <div className="flex gap-8 items-center justify-center flex-wrap mb-8">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="float-animation"
              style={{ animationDelay: `${sponsor.delay}s` }}
            >
              <img
                src={sponsor.img}
                alt={`Patrocinador ${index + 1}`}
                className="w-32 h-32 object-contain hover-scale"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(59, 130, 246, 0.4))",
                }}
              />
            </div>
          ))}
        </div>

        {/* Main Button */}
        <PsButton
          variant="primary"
          size="xl"
          onClick={() => navigate("/voting")}
          className="animate-pulse-glow"
        >
          <Play className="w-8 h-8" />
          INICIAR VOTAÇÃO
        </PsButton>

        {/* Subtitle */}
        <p className="text-xl text-muted-foreground text-center">
          Toque para escolher sua seleção e o melhor jogador do campeonato
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-ps-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-ps-purple/10 rounded-full blur-3xl" />
    </div>
  );
};

export default Home;
