"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

var _database = _interopRequireDefault(require("../database"));

var helpers = _interopRequireWildcard(require("./helpers"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_passport["default"].use("local.signin", new _passportLocal.Strategy({
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true
}, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, username, password, done) {
    var rows, user, validPassword;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _database["default"].query("SELECT * FROM users WHERE username = ?", [username]);

          case 2:
            rows = _context.sent;

            if (!(rows.length > 0)) {
              _context.next = 11;
              break;
            }

            user = rows[0];
            _context.next = 7;
            return helpers.matchPassword(password, user.password);

          case 7:
            validPassword = _context.sent;

            if (validPassword) {
              done(null, user, req.flash("success", "Welcome " + user.username));
            } else {
              done(null, false, req.flash("message", "Incorrect Password"));
            }

            _context.next = 12;
            break;

          case 11:
            return _context.abrupt("return", done(null, false, req.flash("message", "The Username does not exists.")));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}()));

_passport["default"].use("local.signup", new _passportLocal.Strategy({
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true
}, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, username, password, done) {
    var fullname, newUser, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            fullname = req.body.fullname;
            newUser = {
              fullname: fullname,
              username: username,
              password: password
            };
            _context2.next = 4;
            return helpers.encryptPassword(password);

          case 4:
            newUser.password = _context2.sent;
            _context2.next = 7;
            return _database["default"].query("INSERT INTO users SET ? ", newUser);

          case 7:
            result = _context2.sent;
            newUser.id = result.insertId;
            return _context2.abrupt("return", done(null, newUser));

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}()));

_passport["default"].serializeUser(function (user, done) {
  done(null, user.id);
});

_passport["default"].deserializeUser( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id, done) {
    var rows;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _database["default"].query("SELECT * FROM users WHERE id = ?", [id]);

          case 2:
            rows = _context3.sent;
            done(null, rows[0]);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}());