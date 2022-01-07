"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var isNumber_1 = __importDefault(require("lodash/isNumber"));
var isString_1 = __importDefault(require("lodash/isString"));
var isBoolean_1 = __importDefault(require("lodash/isBoolean"));
var isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
var isArray_1 = __importDefault(require("lodash/isArray"));
var isInteger_1 = __importDefault(require("lodash/isInteger"));
var schema_1 = require("../../schema");
var utils_1 = require("./utils");
/**
 * Validates that array length is more or equal to that
 * of the schema minimumItems property
 */
function minimumItems(count, message) {
    return this.test("test-minimumItems", message, function (input) {
        var _a = this, path = _a.path, createError = _a.createError;
        var isValid = isArray_1["default"](input) && input.length >= count;
        return isValid || createError({ path: path, message: message });
    });
}
exports.minimumItems = minimumItems;
/**
 * Validates that array length is less or equal to that
 * of the schema maximumItems property
 */
function maximumItems(count, message) {
    return this.test("test-maximumItems", message, function (input) {
        var _a = this, path = _a.path, createError = _a.createError;
        var isValid = isArray_1["default"](input) && input.length <= count;
        return isValid || createError({ path: path, message: message });
    });
}
exports.maximumItems = maximumItems;
/**
 * Validates the `contains` schema has one or more items in the array
 * equates to the data type of the schema type property
 */
function contains(value, message) {
    return this.test("test-contains", message, function (input) {
        var _a = this, path = _a.path, createError = _a.createError;
        var isValid = false;
        if (isArray_1["default"](input)) {
            if (value === schema_1.DataTypes.NUMBER) {
                isValid = input.some(isNumber_1["default"]);
            }
            if (value === schema_1.DataTypes.INTEGER) {
                isValid = input.some(isInteger_1["default"]);
            }
            if (value === schema_1.DataTypes.STRING) {
                isValid = input.some(isString_1["default"]);
            }
            if (value === schema_1.DataTypes.BOOLEAN) {
                isValid = input.some(isBoolean_1["default"]);
            }
            if (value === schema_1.DataTypes.OBJECT) {
                isValid = input.some(isPlainObject_1["default"]);
            }
            if (value === schema_1.DataTypes.ARRAY) {
                isValid = input.some(isArray_1["default"]);
            }
        }
        return isValid || createError({ path: path, message: message });
    });
}
exports.contains = contains;
/**
 * Validates the items schema property as a tuple. The array is a collection
 * of items where each has a different schema and the ordinal index of
 * each item is meaningful
 */
function tuple(items, message) {
    return this.test("test-tuple", message, function (input) {
        var _a = this, path = _a.path, createError = _a.createError;
        var validator = utils_1.validateItemsArray(items);
        var isValid = input.every(validator);
        return isValid || createError({ path: path, message: message });
    });
}
exports.tuple = tuple;
/**
 * Validates the given array values are unique
 */
function uniqueItems(enable, message) {
    return this.test("test-unique-items", message, function (input) {
        var _a = this, path = _a.path, createError = _a.createError;
        // method will always be valid if uniqueItems property is set to false
        if (!enable)
            return true;
        if (!isArray_1["default"](input))
            return false;
        // empty arrays are always considered valid
        if (input.length === 0)
            return true;
        return utils_1.isUnique(input) || createError({ path: path, message: message });
    });
}
exports.uniqueItems = uniqueItems;
//# sourceMappingURL=array.js.map