"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var get_1 = __importDefault(require("lodash/get"));
var types_1 = require("../types");
var config = {};
/** Store configuration options */
exports.setConfiguration = function (options) {
    config = __assign({}, options);
};
/** Retrieve configuration options */
exports.getConfiguration = function () { return config; };
/** Retrieve all errors from configuration */
exports.getErrors = function () { return config.errors; };
/** Retrieve specific error from configuration */
exports.getError = function (path) {
    var pathArray = path && path.split(".");
    if (!pathArray)
        return false;
    var errors = exports.getErrors();
    return types_1.isConfigError(errors) && get_1["default"](errors, pathArray);
};
//# sourceMappingURL=index.js.map