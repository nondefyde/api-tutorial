import { Router } from 'express';
import auth from '../../middleware/auth';
import Auth from './auth.controller';

const router = Router();
router.use(auth);
router.post('/auth/signup', Auth.register);
router.post('/auth/signin', Auth.login);

export default router;
