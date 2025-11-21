import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PsButton } from "@/components/ui/ps-button";
import { Particles } from "@/components/Particles";
import { allPlayers } from "@/data/teams";
import { ChevronRight, Home } from "lucide-react";
import { toast } from "sonner";

interface Position {
  id: string;
  label: string;
  x: number;
  y: number;
}

const positions: Position[] = [
  { id: "goleiro", label: "Goleiro", x: 50, y: 85 },
  { id: "jogador01", label: "Jogador 1", x: 25, y: 60 },
  { id: "jogador02", label: "Jogador 2", x: 75, y: 60 },
  { id: "jogador03", label: "Jogador 3", x: 25, y: 35 },
  { id: "jogador04", label: "Jogador 4", x: 75, y: 35 },
];

interface VotingFieldProps {
  onComplete: (selections: Record<string, string>) => void;
}

const VotingField = ({ onComplete }: VotingFieldProps) => {
  const navigate = useNavigate();
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [activePosition, setActivePosition] = useState<string | null>(null);

  const handleSelectPlayer = (positionId: string, playerName: string) => {
    setSelections((prev) => ({ ...prev, [positionId]: playerName }));
    setActivePosition(null);
    toast.success(`${playerName} selecionado!`);
  };

  const isComplete = positions.every((pos) => selections[pos.id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-8">
      <Particles />

      {/* Header */}
      <div className="absolute top-8 left-8 right-8 flex justify-between items-center z-20">
        <PsButton variant="glass" size="sm" onClick={() => navigate("/")}>
          <Home className="w-5 h-5" />
          Início
        </PsButton>
        <h1 className="text-3xl font-bold text-foreground neon-text">
          Monte Sua Seleção
        </h1>
        <div className="w-32" />
      </div>

      <div className="relative z-10 w-full max-w-3xl mt-20">
        {/* Field */}
        <div className="relative aspect-[2/3] bg-gradient-to-b from-green-800/20 to-green-900/20 rounded-3xl border-4 border-ps-cyan/30 overflow-hidden glass-morphism">
          {/* Field Lines */}
          <div className="absolute inset-x-0 top-1/2 h-0.5 bg-white/20" />
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/20" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/20 rounded-full" />

          {/* Positions */}
          {positions.map((position) => {
            const isSelected = !!selections[position.id];
            return (
              <button
                key={position.id}
                onClick={() => setActivePosition(position.id)}
                className={`absolute w-24 h-24 rounded-full flex flex-col items-center justify-center font-bold text-sm transition-all duration-300 hover:scale-110 ${
                  isSelected
                    ? "bg-gradient-to-br from-ps-cyan to-ps-blue shadow-[0_0_30px_rgba(6,182,212,0.8)] scale-110"
                    : "glass-morphism hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                }`}
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <span className="text-foreground">{position.label}</span>
                {selections[position.id] && (
                  <span className="text-xs mt-1 text-center px-2">
                    {selections[position.id]}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Continue Button */}
        {isComplete && (
          <div className="mt-8 flex justify-center">
            <PsButton
              variant="primary"
              size="lg"
              onClick={() => onComplete(selections)}
              className="animate-pulse-glow"
            >
              VOTAR NO MELHOR JOGADOR
              <ChevronRight className="w-6 h-6" />
            </PsButton>
          </div>
        )}
      </div>

      {/* Player Selection Modal */}
      {activePosition && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-30 p-8"
          onClick={() => setActivePosition(null)}
        >
          <div
            className="glass-morphism rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center neon-text">
              {positions.find((p) => p.id === activePosition)?.label}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {allPlayers.map((player) => (
                <PsButton
                  key={player.name}
                  variant="glass"
                  size="lg"
                  onClick={() => handleSelectPlayer(activePosition, player.name)}
                  className="justify-start"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: player.teamColor }}
                    />
                    <span>{player.name}</span>
                  </div>
                </PsButton>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VotingField;
