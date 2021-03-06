'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * output of messages
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * all output functions take an internal format of:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * {message: [{item}...]}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Where each item is in the format:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * {sourceFile, line, node}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

var _pofile = require('pofile');

var _pofile2 = _interopRequireDefault(_pofile);

var _version = require('./version');

var _version2 = _interopRequireDefault(_version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultHeaders = {
    "Project-Id-Version": "PROJECT VERSION",
    "Report-Msgid-Bugs-To": "EMAIL@ADDRESS",
    "POT-Creation-Date": "2016-02-25 13:15-0800",
    "PO-Revision-Date": "YEAR-MO-DA HO:MI+ZONE",
    "Last-Translator": "FULL NAME <EMAIL@ADDRESS>",
    "Language-Team": "LANGUAGE <LL@li.org>",
    "MIME-Version": "1.0",
    "Content-Type": "text/plain; charset=utf-8",
    "Content-Transfer-Encoding": "8bit",
    "Generated-By": 'jsxlate ' + (0, _version2.default)()
};

exports.default = {
    json: {
        out: function out(messages) {
            return JSON.stringify(Object.keys(messages).reduce(function (json, msg) {
                json[msg] = msg;
                return json;
            }, {}));
        },
        in: function _in(json) {
            return JSON.parse(json);
        }
    },

    po: {
        out: function out(messages) {
            var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            var _ref$root = _ref.root;
            var root = _ref$root === undefined ? process.cwd() : _ref$root;
            var _ref$headers = _ref.headers;
            var headers = _ref$headers === undefined ? defaultHeaders : _ref$headers;

            var po = new _pofile2.default();
            Object.assign(po.headers, headers);
            Object.entries(messages).forEach(function (_ref2) {
                var _ref3 = _slicedToArray(_ref2, 2);

                var message = _ref3[0];
                var items = _ref3[1];

                var item = new _pofile2.default.Item();
                item.msgid = message;
                item.references = items.map(function (_ref4) {
                    var sourceFile = _ref4.sourceFile;
                    var line = _ref4.line;
                    return sourceFile.replace(root || '', '') + ':' + line;
                });
                po.items.push(item);
            });
            return po.toString();
        },
        in: function _in(poFile) {
            return _pofile2.default.parse(poFile).items.reduce(function (messages, message) {
                messages[message.msgid] = message.msgstr[0];
                return messages;
            }, {});
        }
    },

    // simple passthru for tests
    js: {
        out: function out(messages) {
            return messages;
        },
        in: function _in(messages) {
            return messages;
        }
    }
};

