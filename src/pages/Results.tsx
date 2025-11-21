import { useNavigate } from "react-router-dom";
import { PsButton } from "@/components/ui/ps-button";
import { Particles } from "@/components/Particles";
import { Home, Trophy, Users } from "lucide-react";
import { getTopPlayers, getTopBestPlayer } from "@/lib/storage";
import logo from "@/assets/logo.png";

const Results = () => {
  const navigate = useNavigate();
  const topPlayers = getTopPlayers(5);
  const bestPlayer = getTopBestPlayer();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden p-8">
      <Particles />

      {/* Header */}
      <div className="absolute top-8 left-8 z-20">
        <PsButton variant="glass" size="sm" onClick={() => navigate("/")}>
          <Home className="w-5 h-5" />
          Início
        </PsButton>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-12">
        {/* Logo */}
        <img
          src={logo}
          alt="Championship Logo"
          className="w-48 h-48 object-contain animate-pulse-glow"
        />

        {/* Title */}
        <h1 className="text-6xl font-black text-foreground text-center neon-text mb-8">
          Resultados Oficiais
        </h1>

        {/* Seleção da Confraternização */}
        <div className="glass-morphism rounded-3xl p-12 max-w-4xl w-full">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Users className="w-12 h-12 text-ps-cyan" />
            <h2 className="text-4xl font-bold text-foreground">
              Seleção da Confraternização 2025
            </h2>
          </div>

          {topPlayers.length > 0 ? (
            <div className="space-y-4">
              {/* Goleiro */}
              <div className="bg-gradient-to-r from-ps-blue/20 to-ps-cyan/20 rounded-xl p-6 border-2 border-ps-cyan/50">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">GOLEIRO</div>
                  <div className="text-3xl font-black text-foreground neon-text">
                    {topPlayers[4] || "---"}
                  </div>
                </div>
              </div>

              {/* Linha */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {topPlayers.slice(0, 4).map((player, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-ps-purple/20 to-ps-blue/20 rounded-xl p-6 border-2 border-ps-purple/50 text-center"
                  >
                    <div className="text-xs text-muted-foreground mb-2">
                      JOGADOR {index + 1}
                    </div>
                    <div className="text-xl font-bold text-foreground">{player || "---"}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              <p className="text-xl">Nenhum voto registrado ainda</p>
            </div>
          )}
        </div>

        {/* Melhor Jogador */}
        <div className="glass-morphism rounded-3xl p-12 max-w-4xl w-full">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Trophy className="w-12 h-12 text-ps-cyan animate-pulse-glow" />
            <h2 className="text-4xl font-bold text-foreground">
              Melhor Jogador do Campeonato
            </h2>
            <Trophy className="w-12 h-12 text-ps-cyan animate-pulse-glow" />
          </div>

          {bestPlayer ? (
            <div className="bg-gradient-to-br from-ps-cyan/30 via-ps-blue/30 to-ps-purple/30 rounded-2xl p-12 border-4 border-ps-cyan/70">
              <div className="text-center">
                <Trophy className="w-24 h-24 text-ps-cyan mx-auto mb-6 animate-pulse-glow" />
                <div className="text-6xl font-black text-foreground mb-4 neon-text">
                  {bestPlayer}
                </div>
                <div className="text-2xl text-ps-cyan font-bold">
                  MELHOR JOGADOR 2025
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              <p className="text-xl">Nenhum voto registrado ainda</p>
            </div>
          )}
        </div>

        {/* Back Button */}
        <PsButton
          variant="primary"
          size="lg"
          onClick={() => navigate("/")}
          className="mt-8"
        >
          Voltar ao Início
        </PsButton>
      </div>
    </div>
  );
};

export default Results;
