"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isLoggedIn = void 0;

var isLoggedIn = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/signin");
};

exports.isLoggedIn = isLoggedIn;