import express from 'express';
import path from 'path';
import ejsLayouts from 'express-ejs-layouts';
import router from './routes/web.js';
import viewVariablesMiddleware from './middleware/view-variables-middleware.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import config from './config.js';
import userMiddleware from './middleware/user-middleware.js';

import './db/mongoose.js';

const app = express();
const __dirname = path.resolve();

app.use(session({
  secret: config.sessionKeySecret,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 }, // 2 day,
  resave: false
}));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(ejsLayouts);
app.set('layout', 'layouts/main');

app.use(express.static('public'));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use(viewVariablesMiddleware);
app.use(userMiddleware);

app.use(router);

export default app;

