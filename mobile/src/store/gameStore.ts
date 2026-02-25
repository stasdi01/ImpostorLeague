import { create } from 'zustand';

export type Sport = 'soccer' | 'basketball';
export type Category = 'players' | 'clubs';
export type GameMode = 'impostor' | 'different-player';
export type Role = 'crewmate' | 'impostor';

export interface Player {
  id: string;
  name: string;
  role: Role;
  word: string;
  hint?: string; // only for impostor in Impostor Mode
}

interface GameState {
  // Setup
  sport: Sport | null;
  category: Category | null;
  gameMode: GameMode | null;
  playerCount: number;
  impostorCount: number;
  playerNames: string[];

  // Game
  realWord: string | null;
  players: Player[];
  firstPlayer: string | null;
  currentCardIndex: number;

  // Actions
  setSport: (sport: Sport) => void;
  setCategory: (category: Category) => void;
  setGameMode: (mode: GameMode) => void;
  setPlayerCount: (count: number) => void;
  setImpostorCount: (count: number) => void;
  setPlayerNames: (names: string[]) => void;
  setGameData: (data: { realWord: string; players: Player[]; firstPlayer: string }) => void;
  advanceCard: () => void;
  resetGame: () => void;
}

const initialState = {
  sport: null,
  category: null,
  gameMode: null,
  playerCount: 4,
  impostorCount: 1,
  playerNames: [],
  realWord: null,
  players: [],
  firstPlayer: null,
  currentCardIndex: 0,
};

export const useGameStore = create<GameState>((set) => ({
  ...initialState,

  setSport: (sport) => set({ sport }),
  setCategory: (category) => set({ category }),
  setGameMode: (gameMode) => set({ gameMode }),
  setPlayerCount: (playerCount) => set({ playerCount }),
  setImpostorCount: (impostorCount) => set({ impostorCount }),
  setPlayerNames: (playerNames) => set({ playerNames }),
  setGameData: ({ realWord, players, firstPlayer }) =>
    set({ realWord, players, firstPlayer, currentCardIndex: 0 }),
  advanceCard: () =>
    set((state) => ({ currentCardIndex: state.currentCardIndex + 1 })),
  resetGame: () => set(initialState),
}));
