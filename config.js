"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = require("dotenv");

/**
 * Reading Environment Variables
 */
(0, _dotenv.config)();
var _default = {
  database: {
    connectionLimit: 10,
    host: process.env.DATABASE_HOST || "localhost",
    user: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "",
    database: process.env.DATABASE_NAME || "dblinks"
  },
  port: process.env.PORT || 4000
};
exports["default"] = _default;