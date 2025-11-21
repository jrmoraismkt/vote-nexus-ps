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
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Particles />

      {/* Header */}
      <div className="absolute top-4 left-4 z-20">
        <PsButton variant="glass" size="sm" onClick={() => navigate("/")}>
          <Home className="w-4 h-4" />
          Início
        </PsButton>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6 p-4 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <img
          src={logo}
          alt="Championship Logo"
          className="w-32 h-32 md:w-40 md:h-40 object-contain animate-pulse-glow"
        />

        {/* Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground text-center neon-text">
          Resultados Oficiais 2025
        </h1>

        {/* Container Principal */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Seleção da Confraternização - Layout Quadra */}
          <div className="glass-morphism rounded-3xl p-6 md:p-8 w-full">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Users className="w-8 h-8 md:w-10 md:h-10 text-ps-cyan" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">
                Seleção 2025
              </h2>
            </div>

            {topPlayers.length > 0 ? (
              <div className="relative aspect-[3/4] bg-gradient-to-b from-green-800/20 to-green-900/20 rounded-2xl border-4 border-ps-cyan/30 overflow-hidden">
                {/* Field Lines */}
                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-white/20" />
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/20" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-28 md:h-28 border-2 border-white/20 rounded-full" />

                {/* Formation Display */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
                  {/* Linha de Ataque - 2 Jogadores */}
                  <div className="flex justify-around items-center pt-4">
                    {[topPlayers[0], topPlayers[1]].map((player, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-ps-cyan to-ps-blue shadow-[0_0_20px_rgba(6,182,212,0.8)] flex items-center justify-center border-2 border-ps-cyan">
                          <span className="text-lg md:text-xl font-black text-foreground">
                            {idx + 1}
                          </span>
                        </div>
                        <div className="glass-morphism px-3 py-1 rounded-lg">
                          <span className="text-xs md:text-sm font-bold text-foreground text-center whitespace-nowrap">
                            {player || "---"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Linha de Meio - 2 Jogadores */}
                  <div className="flex justify-around items-center">
                    {[topPlayers[2], topPlayers[3]].map((player, idx) => (
                      <div
                        key={idx + 2}
                        className="flex flex-col items-center gap-2"
                      >
                        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-ps-purple to-ps-blue shadow-[0_0_20px_rgba(168,85,247,0.8)] flex items-center justify-center border-2 border-ps-purple">
                          <span className="text-lg md:text-xl font-black text-foreground">
                            {idx + 3}
                          </span>
                        </div>
                        <div className="glass-morphism px-3 py-1 rounded-lg">
                          <span className="text-xs md:text-sm font-bold text-foreground text-center whitespace-nowrap">
                            {player || "---"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Goleiro */}
                  <div className="flex justify-center items-center pb-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-ps-blue via-ps-cyan to-ps-purple shadow-[0_0_30px_rgba(59,130,246,0.9)] flex items-center justify-center border-2 border-ps-cyan animate-pulse-glow">
                        <span className="text-lg md:text-xl font-black text-foreground">
                          G
                        </span>
                      </div>
                      <div className="glass-morphism px-3 py-1 rounded-lg">
                        <span className="text-xs md:text-sm font-bold text-foreground text-center whitespace-nowrap">
                          {topPlayers[4] || "---"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                <p className="text-lg md:text-xl">Nenhum voto registrado ainda</p>
              </div>
            )}
          </div>

          {/* Melhor Jogador */}
          <div className="glass-morphism rounded-3xl p-6 md:p-8 w-full flex flex-col justify-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Trophy className="w-8 h-8 md:w-10 md:h-10 text-ps-cyan animate-pulse-glow" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">
                Melhor Jogador
              </h2>
              <Trophy className="w-8 h-8 md:w-10 md:h-10 text-ps-cyan animate-pulse-glow" />
            </div>

            {bestPlayer ? (
              <div className="bg-gradient-to-br from-ps-cyan/30 via-ps-blue/30 to-ps-purple/30 rounded-2xl p-8 md:p-12 border-4 border-ps-cyan/70">
                <div className="text-center">
                  <Trophy className="w-20 h-20 md:w-28 md:h-28 text-ps-cyan mx-auto mb-6 animate-pulse-glow" />
                  <div className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 neon-text break-words">
                    {bestPlayer}
                  </div>
                  <div className="text-xl md:text-2xl text-ps-cyan font-bold">
                    MELHOR JOGADOR 2025
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-12">
                <p className="text-lg md:text-xl">Nenhum voto registrado ainda</p>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <PsButton
          variant="primary"
          size="md"
          onClick={() => navigate("/")}
          className="mt-4"
        >
          Voltar ao Início
        </PsButton>
      </div>
    </div>
  );
};

export default Results;
