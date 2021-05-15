"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _path = _interopRequireDefault(require("path"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _passport = _interopRequireDefault(require("passport"));

var _connectFlash = _interopRequireDefault(require("connect-flash"));

var _expressMysqlSession = _interopRequireDefault(require("express-mysql-session"));

var _config = _interopRequireDefault(require("./config"));

var _routes = _interopRequireDefault(require("./routes"));

require("./lib/passport");

// Intializations
var MySQLStore = (0, _expressMysqlSession["default"])(_expressSession["default"]);
var database = _config["default"].database,
    port = _config["default"].port;
var app = (0, _express["default"])(); // Settings

app.set("port", port);
app.set("views", _path["default"].join(__dirname, "views"));
app.engine(".hbs", (0, _expressHandlebars["default"])({
  defaultLayout: "main",
  layoutsDir: _path["default"].join(app.get("views"), "layouts"),
  partialsDir: _path["default"].join(app.get("views"), "partials"),
  extname: ".hbs",
  helpers: require("./lib/handlebars")
}));
app.set("view engine", ".hbs"); // Middlewares

app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"].json());
app.use((0, _expressSession["default"])({
  secret: "faztmysqlnodemysql",
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use((0, _connectFlash["default"])());
app.use(_passport["default"].initialize());
app.use(_passport["default"].session()); // Global variables

app.use(function (req, res, next) {
  app.locals.message = req.flash("message");
  app.locals.success = req.flash("success");
  app.locals.user = req.user;
  next();
}); // Routes

app.use(_routes["default"]); // Public

app.use(_express["default"]["static"](_path["default"].join(__dirname, "public")));
var _default = app;
exports["default"] = _default;