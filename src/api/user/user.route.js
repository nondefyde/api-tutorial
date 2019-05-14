import { Router } from 'express';
import auth from '../../middleware/auth';
import User from './user.controller';

const router = Router();

router.patch('/users/:email/verify', User.verify);

router.use(auth);

router.get('/users', User.find);
router.param('id', User.id);
router.route('/users/:id')
  .get(User.findOne)
  .put(User.update)
  .delete(User.delete);

export default router;
