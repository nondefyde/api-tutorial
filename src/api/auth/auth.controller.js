import UserStore from '../user/user.store';
import { ApiResponse, signToken } from '../../utils/helpers';

export default class AuthController {
  static async login(req, res) {
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
    return res.status(401).json(ApiResponse({ code: 401, error: 'user unauthorized' }));
  }

  static async register(req, res) {
    const payload = req.body;
    // Todo validation for registration
    let user = UserStore.findByEmail(payload.email);
    if (!user) {
      user = UserStore.createNew(payload);
      user.token = await signToken(user);
      return res.status(201).json(ApiResponse({
        code: 200,
        data: user,
      }));
    }
    return res.status(409).json(ApiResponse({ code: 409, error: 'user already exist' }));
  }
}
