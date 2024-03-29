/* eslint-disable no-undef */
const express = require('express');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const expressSession = require('express-session');
const path = require('path');
const passport = require('passport');

require('dotenv').config();

const { SERVER_PORT } = require('config');
const logger = require('./util/logger');
const { startSession } = require('./controllers/session');
const db = require('./db/db');

const app = express();
const port = SERVER_PORT || 3000;

app.use(cookieparser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/assets/')));
app.use(express.static(path.join(__dirname, '../dist/')));

// --------------------------------------------------------------------------------------------//
// Route all requests to MainRouter
app.use('/', require('./routes/user'));

// --------------------------------------------------------------------------------------------//
// oAuth connection
app.use(
  expressSession({
    secret: 'google auth',
    resave: false,
    saveUninitialized: false,
  }),
);

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use('/login/auth/google', require('./routes/oauth'));

// --------------------------------------------------------------------------------------------//
// catch-all route handler for any requests to an unknown route
app.use((req, res) => {
  logger.info('ERROR: Unknown route/path');
  res.sendStatus(404);
});

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  logger.error(`${errorObj.log}, STATUS: ${errorObj.status}, MESSAGE: ${errorObj.message.err}`);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`SUCCESS: Server is running on port: ${port}`);
  logger.info(`SUCCESS: Server is running on port: ${port}`);
});

module.exports = app;
