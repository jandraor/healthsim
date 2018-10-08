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

router.get('/google',
  passport.authenticate('google', {scope: ['email', 'profile']}));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/',
}))

router.get('/twitter', passport.authenticate('twitter'));
router.get('/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/',
}));

router.get('/linkedin',
  passport.authenticate('linkedin',
    { scope: ['r_basicprofile', 'r_emailaddress'] }));

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/',
}));

module.exports = router;
