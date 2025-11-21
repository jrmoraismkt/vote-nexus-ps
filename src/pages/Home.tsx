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
  { img: a1, delay: 0, name: "Com Perfil" },
  { img: a2, delay: 1, name: "Posto Morrinhos" },
  { img: a3, delay: 2, name: "3A Distribuidora" },
  { img: a4, delay: 3, name: "Box Mais" },
  { img: a5, delay: 4, name: "Divino Fogão" },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 md:p-8">
      <Particles />

      {/* Settings Button */}
      <button
        onClick={() => navigate("/admin")}
        className="absolute top-4 right-4 md:top-8 md:right-8 z-20 p-3 md:p-4 glass-morphism rounded-full hover:scale-110 transition-transform"
      >
        <Settings className="w-5 h-5 md:w-6 md:h-6 text-ps-cyan" />
      </button>

      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-12 max-w-4xl w-full">
        {/* Logo */}
        <div className="relative">
          <div className="absolute inset-0 bg-ps-blue/30 blur-3xl rounded-full" />
          <img
            src={logo}
            alt="Championship Logo"
            className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain relative z-10 animate-pulse-glow"
          />
        </div>

        {/* Title */}
        <div className="text-center space-y-3 md:space-y-4 px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground neon-text tracking-wider">
            Seleção da Confraternização
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-ps-cyan">2025</h2>
        </div>

        {/* Floating Sponsors */}
        <div className="flex gap-4 md:gap-6 lg:gap-8 items-center justify-center flex-wrap mb-4 md:mb-8 px-4">
          {sponsors.map((sponsor, index) => (
            <div
              key={index}
              className="float-animation"
              style={{ animationDelay: `${sponsor.delay}s` }}
            >
              <img
                src={sponsor.img}
                alt={sponsor.name}
                className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain hover-scale rounded-full"
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
          size="lg"
          onClick={() => navigate("/voting")}
          className="animate-pulse-glow text-base md:text-xl lg:text-2xl px-8 py-4 md:px-12 md:py-5 lg:px-16 lg:py-6"
        >
          <Play className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
          INICIAR VOTAÇÃO
        </PsButton>

        {/* Subtitle */}
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground text-center px-4">
          Toque para escolher sua seleção e o melhor jogador do campeonato
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-ps-blue/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-ps-purple/10 rounded-full blur-3xl" />
    </div>
  );
};

export default Home;
