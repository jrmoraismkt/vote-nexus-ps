import { Vote, VoteCount } from "@/types/voting";

const STORAGE_KEY = "confraternizacao_votes";

export const saveVote = (vote: Vote): void => {
  const votes = getVotes();
  votes.push(vote);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
};

export const getVotes = (): Vote[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const clearVotes = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getPlayerVotes = (): VoteCount => {
  const votes = getVotes();
  const counts: VoteCount = {};

  votes.forEach((vote) => {
    [vote.jogador01, vote.jogador02, vote.jogador03, vote.jogador04, vote.goleiro].forEach(
      (player) => {
        counts[player] = (counts[player] || 0) + 1;
      }
    );
  });

  return counts;
};

export const getBestPlayerVotes = (): VoteCount => {
  const votes = getVotes();
  const counts: VoteCount = {};

  votes.forEach((vote) => {
    counts[vote.melhorJogador] = (counts[vote.melhorJogador] || 0) + 1;
  });

  return counts;
};

export const getTopPlayers = (count: number = 5): string[] => {
  const playerVotes = getPlayerVotes();
  return Object.entries(playerVotes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, count)
    .map(([name]) => name);
};

export const getTopBestPlayer = (): string | null => {
  const bestPlayerVotes = getBestPlayerVotes();
  const sorted = Object.entries(bestPlayerVotes).sort(([, a], [, b]) => b - a);
  return sorted.length > 0 ? sorted[0][0] : null;
};
