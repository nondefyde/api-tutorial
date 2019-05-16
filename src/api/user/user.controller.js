import UserStore from './user.store';
import { ApiResponse } from '../../utils/helpers';


export default class UserController {
  static async id(req, res, next, id) {
    const user = UserStore.findByID(id);
    if (user) {
      req.user = user;
      return next();
    }
    return res.status(404).json(ApiResponse({ code: 404, error: 'user not found' }));
  }

  static async find(req, res) {
    return res.status(200).json(ApiResponse({
      code: 200,
      data: UserStore.find(),
    }));
  }

  static update(req, res) {
    const payload = req.body;
    // Todo Validate if update should happen
    const user = Object.assign({}, req.user, payload);
    UserStore.update(user, 'id');
    return res.status(201).json(ApiResponse({
      code: 200,
      data: user,
    }));
  }

  static findOne(req, res) {
    return res.status(200).json(ApiResponse({
      code: 200,
      data: req.user,
    }));
  }

  static delete(req, res) {
    const { user } = req;
    UserStore.deleteByID(user);
    return res.status(200).json(ApiResponse({
      code: 200,
      data: {
        id: user.id,
      },
    }));
  }

  static async verify(req, res) {
    const { email } = req.params;
    // Todo validate user payload
    const user = UserStore.findByEmail(email);
    if (user) {
      user.status = true;
      UserStore.update(user, 'id');
      return res.status(201).json(ApiResponse({
        code: 200,
        data: user,
      }));
    }
    return res.status(404).json(ApiResponse({ code: 404, error: 'user not found' }));
  }
}
