import { Router } from 'express';
import { setupGame } from '../controllers/gameController';

const router = Router();

router.post('/setup', setupGame);

export default router;
