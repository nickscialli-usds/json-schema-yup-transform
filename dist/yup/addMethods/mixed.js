"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var utils_1 = require("./utils");
/**
 * Validates whether input value matches const
 */
function constant(value, message) {
    return this.test("test-constant", message, function (input) {
        var _a = this, path = _a.path, createError = _a.createError;
        return isEqual_1["default"](value, input) || createError({ path: path, message: message });
    });
}
exports.constant = constant;
/**
 * Validates whetherinput value is an enum
 */
function enums(value, message) {
    return this.test("test-enum", message, function (input) {
        var _a = this, path = _a.path, createError = _a.createError;
        return utils_1.isValueEnum(value, input) || createError({ path: path, message: message });
    });
}
exports.enums = enums;
//# sourceMappingURL=mixed.js.map