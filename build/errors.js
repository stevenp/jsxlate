"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.assertInput = assertInput;
exports.assertUnique = assertUnique;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
 *  Error type & handling, assertions
 */

var InputError = function (_Error) {
    _inherits(InputError, _Error);

    function InputError(description, node) {
        _classCallCheck(this, InputError);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InputError).call(this, description));

        Object.assign(_this, {
            description: description,
            node: node,
            inputError: true
        });
        return _this;
    }

    return InputError;
}(Error);

function assertInput(condition, description, node) {
    if (!condition) {
        throw new InputError(description, node);
    }
}

function assertUnique(map, description, node) {
    var dupes = Object.entries(map).filter(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var _ = _ref2[0];
        var value = _ref2[1];
        return value > 1;
    } // eslint-disable-line no-unused-vars
    );
    assertInput(dupes.length === 0, description + ": " + dupes, node);
}

