"use strict";

var authCtrl = {};

var passport = require('passport');

authCtrl.renderSignUp = function (req, res) {
  res.render('auth/signup');
};

authCtrl.signUp = passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
});

authCtrl.renderSignIn = function (req, res, next) {
  res.render('auth/signin');
};

authCtrl.signIn = passport.authenticate('local.signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: true
});

authCtrl.logout = function (req, res, next) {
  req.logOut();
  res.redirect('/');
};

module.exports = authCtrl;