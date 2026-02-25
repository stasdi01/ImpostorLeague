import OpenAI from 'openai';
import { supabase } from '../data/supabaseClient';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ─── Types ────────────────────────────────────────────────────────────────────

export type Sport = 'soccer' | 'basketball';
export type Category = 'players' | 'clubs';
export type GameMode = 'impostor' | 'different-player';
export type Role = 'crewmate' | 'impostor';

export interface PlayerCard {
  id: string;
  name: string;
  role: Role;
  word: string;
  hint?: string;
}

export interface GameSession {
  realWord: string;
  players: PlayerCard[];
  firstPlayer: string;
}

export interface GameSetupInput {
  sport: Sport;
  category: Category;
  gameMode: GameMode;
  playerCount: number;
  impostorCount: number;
  playerNames: string[];
}

// ─── Random word from Supabase ────────────────────────────────────────────────

async function pickRandomWord(sport: Sport, category: Category): Promise<string> {
  const table = category === 'players' ? 'players' : 'clubs';

  const { data, error } = await supabase
    .from(table)
    .select('name')
    .eq('sport', sport);

  if (error || !data || data.length === 0) {
    throw new Error(`Could not fetch ${category} for sport: ${sport}`);
  }

  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex].name as string;
}

async function pickDifferentWord(
  sport: Sport,
  category: Category,
  excludeWord: string,
): Promise<string> {
  const table = category === 'players' ? 'players' : 'clubs';

  const { data, error } = await supabase
    .from(table)
    .select('name')
    .eq('sport', sport)
    .neq('name', excludeWord);

  if (error || !data || data.length === 0) {
    throw new Error(`Could not fetch fallback ${category} for sport: ${sport}`);
  }

  const randomIndex = Math.floor(Math.random() * data.length);
  return data[randomIndex].name as string;
}

// ─── OpenAI calls ─────────────────────────────────────────────────────────────

async function generateHint(realWord: string, sport: Sport, category: Category): Promise<string | null> {
  const entityType = category === 'players' ? 'player' : 'club';

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content:
            `You are helping run a social deduction party game about ${sport}. ` +
            `The secret word is the ${sport} ${entityType} "${realWord}". ` +
            `Give a subtle hint — a single word or very short phrase (max 3 words) — ` +
            `that loosely relates to "${realWord}" without naming it or revealing it directly. ` +
            `Do NOT use statistics, award counts, or easily Googled superlatives. ` +
            `Good hints point to broad attributes: nationality, city, country, color, league, or continent. ` +
            `Reply with ONLY the hint — no punctuation, no explanation.`,
        },
      ],
      max_tokens: 20,
      temperature: 0.8,
    });

    return response.choices[0]?.message?.content?.trim() ?? null;
  } catch {
    return null; // graceful failure — card will show "No hint available"
  }
}

async function generateConnectedWord(
  realWord: string,
  sport: Sport,
  category: Category,
  fallbackWord: string,
): Promise<string> {
  const entityType = category === 'players' ? 'player' : 'club';

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content:
            `You are helping run a social deduction party game about ${sport}. ` +
            `The real secret word is the ${sport} ${entityType} "${realWord}". ` +
            `Give me a DIFFERENT real ${sport} ${entityType} that shares a natural but subtle connection ` +
            `with "${realWord}" — same nationality, same position, same era, same league, or same country. ` +
            `The connection must be subtle enough that someone receiving this word might not immediately ` +
            `realise it is different from the real word. ` +
            `Reply with ONLY the name of the ${entityType} — no explanation, no punctuation.`,
        },
      ],
      max_tokens: 20,
      temperature: 0.9,
    });

    const connected = response.choices[0]?.message?.content?.trim();
    if (!connected || connected.toLowerCase() === realWord.toLowerCase()) {
      return fallbackWord;
    }
    return connected;
  } catch {
    return fallbackWord; // if OpenAI fails, use the random Supabase fallback
  }
}

// ─── Role assignment ──────────────────────────────────────────────────────────

function assignRoles(
  playerNames: string[],
  impostorCount: number,
): { name: string; role: Role }[] {
  const shuffled = [...playerNames].sort(() => Math.random() - 0.5);
  return shuffled.map((name, i) => ({
    name,
    role: i < impostorCount ? 'impostor' : 'crewmate',
  }));
}

function pickFirstPlayer(playerNames: string[]): string {
  return playerNames[Math.floor(Math.random() * playerNames.length)];
}

// ─── Main service ─────────────────────────────────────────────────────────────

export async function buildGameSession(input: GameSetupInput): Promise<GameSession> {
  const { sport, category, gameMode, playerCount, impostorCount, playerNames } = input;

  // Fill missing names with defaults
  const resolvedNames = Array.from({ length: playerCount }, (_, i) =>
    playerNames[i]?.trim() || `Player ${i + 1}`,
  );

  // 1. Pick the real word from Supabase
  const realWord = await pickRandomWord(sport, category);

  // 2. Assign roles
  const assignments = assignRoles(resolvedNames, impostorCount);

  // 3. Build cards per game mode
  let players: PlayerCard[];

  if (gameMode === 'impostor') {
    // Generate one hint for all impostors
    const hint = await generateHint(realWord, sport, category);

    players = assignments.map((p, i) => ({
      id: String(i + 1),
      name: p.name,
      role: p.role,
      word: p.role === 'crewmate' ? realWord : 'Impostor',
      hint: p.role === 'impostor' ? (hint ?? undefined) : undefined,
    }));
  } else {
    // Different Player Mode
    // Pre-fetch a random fallback in case OpenAI fails
    const fallbackWord = await pickDifferentWord(sport, category, realWord);

    // Generate connected word once (all impostors share the same different word)
    const differentWord = await generateConnectedWord(realWord, sport, category, fallbackWord);

    players = assignments.map((p, i) => ({
      id: String(i + 1),
      name: p.name,
      role: p.role,
      word: p.role === 'crewmate' ? realWord : differentWord,
      // No hint, no role shown on card for Different Player Mode
    }));
  }

  // 4. Pick first player
  const firstPlayer = pickFirstPlayer(resolvedNames);

  return { realWord, players, firstPlayer };
}