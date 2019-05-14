import jwt from 'jsonwebtoken';
import config from 'config'; // used to create, sign, and verify tokens

export const excluded = [
  { route: 'auth/signin', method: 'POST' },
  { route: 'auth/signup', method: 'POST' },
];

const prefix = '/api/v1/';
export default (req, res, next) => {
  const currentUrlPath = req.originalUrl.split('?')[0];
  const filtered = excluded.filter((item) => {
    const url = `${prefix}${item.route}`;
    return currentUrlPath === url && req.method.toLowerCase() === item.method.toLowerCase();
  });
  if (filtered.length) return next();
  const token = req.body.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.get('app.superSecret'), (err, decoded) => {
      if (err) {
        let message = '';
        if (err.name) {
          switch (err.name) {
            case 'TokenExpiredError':
              message = 'You are not logged in!';
              break;
            default:
              message = 'Failed to authenticate token';
              break;
          }
        }
        return next({
          message,
          code: 401,
        });
      }
      req.userId = decoded.userId;
      return next();
    });
  }
  return next({
    message: 'No authorization token provided',
    code: 401,
  });
};
