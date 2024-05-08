import { Router } from 'express';
import { getSentences, getStories } from '../controllers/storyController';

const router = Router();

router.get('/stories', getStories);
router.get('/stories/:id', getSentences);

export default router;
