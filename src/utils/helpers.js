import jwt from 'jsonwebtoken';
import config from 'config';

export const ApiResponse = ({ code, error, data }) => {
  const response = {};
  if (error) {
    response.error = error;
  }
  response.status = code;
  if (data) {
    response.data = data;
  }
  return response;
};

/**
 * @param {Object} obj The object properties
 * @return {Promise<Object>}
 */
export const signToken = async obj => jwt.sign(obj, config.get('app.superSecret'), { expiresIn: config.get('app.auth.expiresIn') });
