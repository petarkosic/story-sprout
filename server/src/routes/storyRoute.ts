import { Router } from 'express';
import {
	addNewStory,
	addSentence,
	getSentences,
	getStories,
} from '../controllers/storyController';
import verifyToken from '../middleware/verifyToken';

const router = Router();

router.get('/stories', getStories);
router.get('/stories/:id', getSentences);
router.post('/stories', verifyToken, addSentence);
router.post('/stories/new', verifyToken, addNewStory);

export default router;
