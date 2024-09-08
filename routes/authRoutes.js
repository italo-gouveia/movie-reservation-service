import { Router } from 'express';
import { signUp, login, refreshToken } from '../controllers/authController';
const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

export default router;
