import UserStore from './user.store';
import { ApiResponse } from '../../utils/helpers';


export default class UserController {
  static id(req, res, next, id) {
    const user = UserStore.findByID(id);
    if (user) {
      req.user = user;
      return next();
    }
    return next({
      code: 404,
    });
  }

  static find(req, res) {
    return res.status(200).json(ApiResponse({
      code: 200,
      data: UserStore.find(),
    }));
  }

  static update(req, res, next) {
    const payload = req.body;
    // Todo Validate if update should happen
    const user = Object.assign({}, req.user, payload);
    UserStore.update(user, 'id');
    res.status(201).json(ApiResponse({
      code: 200,
      data: user,
    }));
    return next();
  }

  static findOne(req, res, next) {
    res.status(200).json(ApiResponse({
      code: 200,
      data: req.user,
    }));
    return next();
  }

  static delete(req, res, next) {
    const { user } = req;
    UserStore.deleteByID(user);
    res.status(200).json(ApiResponse({
      code: 200,
      data: {
        id: user.id,
      },
    }));
    return next();
  }

  static async verify(req, res, next) {
    const { email } = req.params;
    // Todo validate user payload
    const user = UserStore.findByEmail(email);
    if (user) {
      user.status = true;
      UserStore.update(user, 'id');
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
