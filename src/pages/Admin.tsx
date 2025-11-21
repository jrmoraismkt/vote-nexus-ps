import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PsButton } from "@/components/ui/ps-button";
import { Particles } from "@/components/Particles";
import { Home, Eye, Trash2, Trophy, Users } from "lucide-react";
import { getVotes, getPlayerVotes, getBestPlayerVotes, clearVotes } from "@/lib/storage";
import { toast } from "sonner";

const Admin = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPartial, setShowPartial] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "2525") {
      setAuthenticated(true);
      toast.success("Acesso autorizado!");
    } else {
      toast.error("Senha incorreta!");
      setPassword("");
    }
  };

  const handleClearVotes = () => {
    if (confirm("Tem certeza que deseja limpar todos os votos?")) {
      clearVotes();
      toast.success("Todos os votos foram limpos!");
    }
  };

  const votes = getVotes();
  const playerVotes = getPlayerVotes();
  const bestPlayerVotes = getBestPlayerVotes();

  const topPlayers = Object.entries(playerVotes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const topBestPlayer = Object.entries(bestPlayerVotes).sort(([, a], [, b]) => b - a)[0];

  if (!authenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-8">
        <Particles />

      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
        <PsButton variant="glass" size="sm" onClick={() => navigate("/")}>
          <Home className="w-4 h-4 md:w-5 md:h-5" />
          Início
        </PsButton>
      </div>

        <div className="relative z-10 glass-morphism rounded-3xl p-12 max-w-md w-full">
          <h1 className="text-4xl font-bold text-foreground text-center mb-8 neon-text">
            Área Administrativa
          </h1>

          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Senha de Acesso
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ps-cyan text-foreground"
                placeholder="Digite a senha"
                autoFocus
              />
            </div>

            <PsButton type="submit" variant="primary" size="lg" className="w-full">
              Acessar
            </PsButton>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden p-8">
      <Particles />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-4 p-4">
        <PsButton variant="glass" size="sm" onClick={() => navigate("/")}>
          <Home className="w-4 h-4 md:w-5 md:h-5" />
          Início
        </PsButton>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground neon-text text-center">
          Painel Administrativo
        </h1>

        <PsButton
          variant="secondary"
          size="sm"
          onClick={() => setShowPartial(!showPartial)}
        >
          <Eye className="w-4 h-4 md:w-5 md:h-5" />
          {showPartial ? "Ocultar" : "Ver"} Parcial
        </PsButton>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 p-4">
        {/* Statistics */}
        <div className="glass-morphism rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Users className="w-7 h-7 text-ps-cyan" />
            Estatísticas Gerais
          </h2>

          <div className="space-y-4">
            <div className="bg-muted/20 rounded-xl p-4">
              <div className="text-sm text-muted-foreground">Total de Votos</div>
              <div className="text-3xl font-bold text-ps-cyan">{votes.length}</div>
            </div>

            <div className="bg-muted/20 rounded-xl p-4">
              <div className="text-sm text-muted-foreground mb-3">
                Jogadores Mais Votados
              </div>
              <div className="space-y-2">
                {topPlayers.map(([name, count], index) => (
                  <div key={name} className="flex justify-between items-center">
                    <span className="font-medium">
                      {index + 1}. {name}
                    </span>
                    <span className="text-ps-cyan font-bold">{count} votos</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Best Player */}
        <div className="glass-morphism rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Trophy className="w-7 h-7 text-ps-cyan" />
            Melhor Jogador do Campeonato
          </h2>

          {topBestPlayer && (
            <div className="bg-gradient-to-br from-ps-blue/20 to-ps-purple/20 rounded-xl p-6 border-2 border-ps-cyan/50">
              <div className="text-center">
                <Trophy className="w-16 h-16 text-ps-cyan mx-auto mb-4 animate-pulse-glow" />
                <div className="text-4xl font-black text-foreground mb-2 neon-text">
                  {topBestPlayer[0]}
                </div>
                <div className="text-2xl text-ps-cyan font-bold">
                  {topBestPlayer[1]} votos
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 space-y-2">
            <div className="text-sm text-muted-foreground mb-3">Ranking Completo</div>
            {Object.entries(bestPlayerVotes)
              .sort(([, a], [, b]) => b - a)
              .map(([name, count], index) => (
                <div key={name} className="flex justify-between items-center bg-muted/20 rounded-lg p-3">
                  <span className="font-medium">
                    {index + 1}. {name}
                  </span>
                  <span className="text-ps-cyan font-bold">{count} votos</span>
                </div>
              ))}
          </div>
        </div>

        {/* Actions */}
        <div className="glass-morphism rounded-3xl p-8 lg:col-span-2">
          <h2 className="text-2xl font-bold text-foreground mb-6">Ações</h2>
          <div className="flex gap-4">
            <PsButton variant="primary" size="lg" onClick={() => navigate("/results")}>
              <Eye className="w-5 h-5" />
              Ver Resultados Finais
            </PsButton>

            <PsButton variant="danger" size="lg" onClick={handleClearVotes}>
              <Trash2 className="w-5 h-5" />
              Limpar Todos os Votos
            </PsButton>
          </div>
        </div>
      </div>

      {/* Partial Results Modal */}
      {showPartial && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-40 p-8"
          onClick={() => setShowPartial(false)}
        >
          <div
            className="glass-morphism rounded-3xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center neon-text">
              Resultados Parciais
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-ps-cyan mb-4">Seleção (Top 5)</h3>
                <div className="space-y-3">
                  {topPlayers.map(([name, count], index) => (
                    <div key={name} className="bg-muted/20 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">
                          {index + 1}. {name}
                        </span>
                        <span className="text-ps-cyan font-bold">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-ps-cyan mb-4">Melhor Jogador</h3>
                {topBestPlayer && (
                  <div className="bg-gradient-to-br from-ps-blue/30 to-ps-purple/30 rounded-lg p-6 border-2 border-ps-cyan/50">
                    <div className="text-center">
                      <Trophy className="w-12 h-12 text-ps-cyan mx-auto mb-3" />
                      <div className="text-2xl font-black text-foreground mb-2">
                        {topBestPlayer[0]}
                      </div>
                      <div className="text-xl text-ps-cyan font-bold">
                        {topBestPlayer[1]} votos
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
