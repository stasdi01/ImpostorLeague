import { Request, Response } from 'express';
import { buildGameSession } from '../services/gameService';

export async function setupGame(req: Request, res: Response): Promise<void> {
  try {
    const { sport, category, gameMode, playerCount, impostorCount, playerNames } = req.body;
    const session = await buildGameSession({
      sport,
      category,
      gameMode,
      playerCount,
      impostorCount,
      playerNames,
    });
    res.json(session);
  } catch (err) {
    console.error('setupGame error:', err);
    res.status(500).json({ error: 'Failed to set up game' });
  }
}
