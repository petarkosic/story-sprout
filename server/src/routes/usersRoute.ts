import { Router } from 'express';
import { checkNickname } from '../controllers/usersController';

const router = Router();

router.get('/check-nickname', checkNickname);

export default router;
