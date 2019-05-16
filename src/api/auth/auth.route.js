import { Router } from 'express';
import Auth from './auth.controller';

const router = Router();
router.post('/auth/signup', Auth.register);
router.post('/auth/signin', Auth.login);

export default router;
