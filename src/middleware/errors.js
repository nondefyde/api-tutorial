import { ApiResponse } from '../utils/helpers';

export default (error, req, res) => res.status(error.code ? error.code : 500).json(ApiResponse({
  code: error.code ? error.code : 500,
  error,
}));
