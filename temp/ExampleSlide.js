"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ExampleSlide = function ExampleSlide() {
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '2em'
    }
  }, /*#__PURE__*/_react["default"].createElement("h1", {
    style: {
      fontSize: '3em',
      marginBottom: '0.5em',
      textAlign: 'center'
    }
  }, "My First PDF Slide"), /*#__PURE__*/_react["default"].createElement("p", {
    style: {
      fontSize: '1.5em',
      maxWidth: '80%',
      textAlign: 'center',
      lineHeight: '1.4'
    }
  }, "This TSX file will be converted to a PDF page with the exact 16:9 aspect ratio, maintaining the full gradient background."), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      marginTop: '2em',
      padding: '1em 2em',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '8px'
    }
  }, /*#__PURE__*/_react["default"].createElement("p", {
    style: {
      fontSize: '1.2em'
    }
  }, "Created with the TSX to PDF converter")));
};
var _default = exports["default"] = ExampleSlide;