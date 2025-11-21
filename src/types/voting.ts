export interface Player {
  name: string;
  team: string;
  teamColor: string;
}

export interface Team {
  name: string;
  color: string;
  emoji: string;
  players: string[];
}

export interface Vote {
  id: string;
  jogador01: string;
  jogador02: string;
  jogador03: string;
  jogador04: string;
  goleiro: string;
  melhorJogador: string;
  timestamp: number;
}

export interface VoteCount {
  [playerName: string]: number;
}
