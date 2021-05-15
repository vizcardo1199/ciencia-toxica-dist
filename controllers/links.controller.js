"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editLink = exports.renderEditLink = exports.deleteLink = exports.renderLinks = exports.addLink = exports.renderAddLink = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _database = _interopRequireDefault(require("../database"));

var renderAddLink = function renderAddLink(req, res) {
  res.render("links/add");
};

exports.renderAddLink = renderAddLink;

var addLink = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, title, url, description, newLink;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, url = _req$body.url, description = _req$body.description;
            newLink = {
              title: title,
              url: url,
              description: description,
              user_id: req.user.id
            };
            _context.next = 4;
            return _database["default"].query("INSERT INTO links set ?", [newLink]);

          case 4:
            req.flash("success", "Link Saved Successfully");
            res.redirect("/links");

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addLink(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.addLink = addLink;

var renderLinks = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var links;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _database["default"].query("SELECT * FROM links WHERE user_id = ?", [req.user.id]);

          case 2:
            links = _context2.sent;
            res.render("links/list", {
              links: links
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function renderLinks(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.renderLinks = renderLinks;

var deleteLink = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return _database["default"].query("DELETE FROM links WHERE ID = ?", [id]);

          case 3:
            req.flash("success", "Link Removed Successfully");
            res.redirect("/links");

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function deleteLink(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteLink = deleteLink;

var renderEditLink = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, links;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.next = 3;
            return _database["default"].query("SELECT * FROM links WHERE id = ?", [id]);

          case 3:
            links = _context4.sent;
            console.log(links);
            res.render("links/edit", {
              link: links[0]
            });

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function renderEditLink(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.renderEditLink = renderEditLink;

var editLink = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, _req$body2, title, description, url, newLink;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, url = _req$body2.url;
            newLink = {
              title: title,
              description: description,
              url: url
            };
            _context5.next = 5;
            return _database["default"].query("UPDATE links set ? WHERE id = ?", [newLink, id]);

          case 5:
            req.flash("success", "Link Updated Successfully");
            res.redirect("/links");

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function editLink(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.editLink = editLink;