import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PsButton } from "@/components/ui/ps-button";
import { Particles } from "@/components/Particles";
import { allPlayers } from "@/data/teams";
import { Trophy, Home } from "lucide-react";
import { saveVote } from "@/lib/storage";
import { toast } from "sonner";

interface BestPlayerProps {
  selections: Record<string, string>;
}

const BestPlayer = ({ selections }: BestPlayerProps) => {
  const navigate = useNavigate();
  const [selectedBest, setSelectedBest] = useState<string | null>(null);

  const handleVote = (playerName: string) => {
    const vote = {
      id: `${Date.now()}-${Math.random()}`,
      jogador01: selections.jogador01,
      jogador02: selections.jogador02,
      jogador03: selections.jogador03,
      jogador04: selections.jogador04,
      goleiro: selections.goleiro,
      melhorJogador: playerName,
      timestamp: Date.now(),
    };

    saveVote(vote);
    setSelectedBest(playerName);
    
    toast.success("Voto registrado com sucesso!", {
      description: "Obrigado por participar!",
    });

    setTimeout(() => {
      navigate("/results");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-8">
      <Particles />

      {/* Header */}
      <div className="absolute top-8 left-8 z-20">
        <PsButton variant="glass" size="sm" onClick={() => navigate("/")}>
          <Home className="w-5 h-5" />
          Início
        </PsButton>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Title */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Trophy className="w-16 h-16 text-ps-cyan animate-pulse-glow" />
            <h1 className="text-5xl font-black text-foreground neon-text">
              Melhor Jogador do Campeonato
            </h1>
            <Trophy className="w-16 h-16 text-ps-cyan animate-pulse-glow" />
          </div>
          <p className="text-xl text-muted-foreground">
            Selecione o jogador que se destacou durante todo o campeonato
          </p>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
          {allPlayers.map((player) => (
            <PsButton
              key={player.name}
              variant={selectedBest === player.name ? "primary" : "glass"}
              size="lg"
              onClick={() => handleVote(player.name)}
              className="h-24 justify-start hover-lift"
              disabled={!!selectedBest}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-6 h-6 rounded-full flex-shrink-0"
                  style={{ backgroundColor: player.teamColor }}
                />
                <div className="text-left">
                  <div className="font-bold text-lg">{player.name}</div>
                  <div className="text-sm opacity-70">{player.team}</div>
                </div>
              </div>
            </PsButton>
          ))}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: hsl(var(--ps-cyan));
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--ps-blue));
        }
      `}</style>
    </div>
  );
};

export default BestPlayer;
