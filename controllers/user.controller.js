"use strict";

var userCtrl = {};

userCtrl.renderUserProfile = function (req, res, next) {
  res.render('profile');
};

module.exports = userCtrl;