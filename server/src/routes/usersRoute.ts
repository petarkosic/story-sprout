import { Router } from 'express';
import verifyToken from '../middleware/verifyToken';
import {
	changeNickname,
	checkNickname,
	getUsersSentences,
	getUsersStories,
} from '../controllers/usersController';

const router = Router();

router.get('/:user_id/stories', getUsersStories);
router.get('/:user_id/sentences', getUsersSentences);
router.get('/check-nickname', checkNickname);
router.post('/change-nickname', verifyToken, changeNickname);

export default router;
