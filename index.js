"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

/**
 * Importing the Main App
 */
_app["default"].listen(_app["default"].get("port"));

console.log("Server is in port", _app["default"].get("port"));