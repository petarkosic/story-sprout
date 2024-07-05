import { Router } from 'express';
import verifyToken from '../middleware/verifyToken';
import { changeNickname, checkNickname } from '../controllers/usersController';

const router = Router();

router.get('/check-nickname', checkNickname);
router.post('/change-nickname', verifyToken, changeNickname);

export default router;
