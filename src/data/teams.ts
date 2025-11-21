import { Team } from "@/types/voting";

export const teams: Team[] = [
  {
    name: "Time Preto",
    color: "#1a1a1a",
    emoji: "⬛",
    players: ["Delano", "Renan", "Cléber", "Marlúcio", "Matheus"],
  },
  {
    name: "Time Verde",
    color: "#22c55e",
    emoji: "🟩",
    players: ["Chantal", "Neto", "Gabriel", "Júnior", "Romário"],
  },
  {
    name: "Time Vermelho",
    color: "#ef4444",
    emoji: "🟥",
    players: ["Evandro", "Cayo", "Cristiano", "Fábio", "Vencedor"],
  },
  {
    name: "Time Azul",
    color: "#3b82f6",
    emoji: "🟦",
    players: ["Lytson", "Ângelo", "Carlos", "Luís", "Aurélio"],
  },
];

export const allPlayers = teams.flatMap((team) =>
  team.players.map((name) => ({
    name,
    team: team.name,
    teamColor: team.color,
  }))
);
