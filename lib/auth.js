'use strict';
const router = require('express').Router();
const passport = require('passport');

router.get('/facebook', passport.authenticate('facebook', {
  scope : ['email']
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/',
}));

router.get('/signout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
