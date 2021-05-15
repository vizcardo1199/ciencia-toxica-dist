"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeago = void 0;

var _timeago = require("timeago.js");

var timeago = function timeago(savedTimestamp) {
  return (0, _timeago.format)(savedTimestamp);
};

exports.timeago = timeago;