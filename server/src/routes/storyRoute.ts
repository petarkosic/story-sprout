import { Router } from 'express';
import { getStories } from '../controllers/storyController';

const router = Router();

router.get('/stories', getStories);

export default router;
