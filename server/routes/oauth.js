const express = require('express');

const router = express.Router();
const passport = require('passport');

const { startSession } = require('../controllers/session');

router.get(
  '/',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get(
  '/callback',
  passport.authenticate('google', { failureDirect: '/' }),
  (req, res, next) => {
    res.cookie('ssid', req.session.passport.user._id);
    const user = { _id: req.session.passport.user._id };
    res.locals.user = req.session.passport.user;
    next();
  },
  startSession,
  (req, res) => res.redirect('/'),
);

module.exports = router;
