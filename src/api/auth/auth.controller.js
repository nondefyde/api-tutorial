import UserStore from '../user/user.store';
import { ApiResponse, signToken } from '../../utils/helpers';

export default class AuthController {
  static async login(req, res, next) {
    const payload = req.body;
    // Todo validation for login
    const user = UserStore.findByEmail(payload.email);
    if (user && UserStore.matchPassword(payload.password)) {
      user.token = await signToken(user);
      return res.status(201).json(ApiResponse({
        code: 200,
        data: user,
      }));
    }
    return next({
      code: 401,
    });
  }

  static async register(req, res, next) {
    const payload = req.body;
    // Todo validation for registration
    let user = UserStore.findByEmail(payload.email);
    if (!user) {
      user = UserStore.createNew(payload);
      user.token = await signToken(user);
      res.status(201).json(ApiResponse({
        code: 200,
        data: user,
      }));
      return next();
    }
    return next({
      code: 409,
    });
  }
}
