import express from 'express';
import logger from 'morgan';
import path from 'path';
import http from 'http';
import config from 'config';
import cookieParser from 'cookie-parser';

import user from './api/user/user.route';
import auth from './api/auth/auth.route';

const app = express();

const port = 3000;
const prefix = `/api/v${config.get('api.version')}`;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.set('port', port);

app.use(prefix, auth);
app.use(prefix, user);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Application listening on localhost:${port}`);
});
