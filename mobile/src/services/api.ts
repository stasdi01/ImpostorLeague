import { Sport, Category, GameMode, Player } from '../store/gameStore';

const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_URL ?? 'http://localhost:3000';

export interface GameSetupRequest {
  sport: Sport;
  category: Category;
  gameMode: GameMode;
  playerCount: number;
  impostorCount: number;
  playerNames: string[];
}

export interface GameSetupResponse {
  realWord: string;
  players: Player[];
  firstPlayer: string;
}

export async function setupGame(payload: GameSetupRequest): Promise<GameSetupResponse> {
  const response = await fetch(`${BASE_URL}/api/game/setup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Game setup failed: ${response.status}`);
  }

  return response.json() as Promise<GameSetupResponse>;
}
