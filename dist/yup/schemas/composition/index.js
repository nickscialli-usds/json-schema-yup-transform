"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var lodash_1 = require("lodash");
var __1 = __importDefault(require(".."));
var addMethods_1 = __importDefault(require("../../addMethods"));
var config_1 = require("../../config");
var utils_1 = require("../../utils");
/**
 * To validate against anyOf, the given data must be valid against any (one or more) of the given subschemas.
 */
exports.createAnyOfSchema = function (_a, jsonSchema) {
    var key = _a[0], value = _a[1];
    var path = utils_1.joinPath(value.description, "anyOf");
    var message = config_1.getError(path) || lodash_1.capitalize(key + " does not match alternatives");
    var schemas = value.anyOf.map(function (val, i) {
        return __1["default"]([key + "[" + i + "]", val], jsonSchema);
    });
    return addMethods_1["default"].mixed().test("one-of-schema", message, function (current) {
        var _this = this;
        return schemas.some(function (s) { return s.isValidSync(current, _this.options); });
    });
};
/**
 * To validate against allOf, the given data must be valid against all of the given subschemas.
 */
exports.createAllOfSchema = function (_a, jsonSchema) {
    var key = _a[0], value = _a[1];
    var path = utils_1.joinPath(value.description, "allOf");
    var message = config_1.getError(path) || lodash_1.capitalize(key + " does not match all alternatives");
    var schemas = value.allOf
        .filter(function (el) { return typeof el !== "boolean" && el["if"] === undefined; })
        .map(function (val, i) {
        return __1["default"]([key + "[" + i + "]", val], jsonSchema);
    });
    return addMethods_1["default"].mixed().test("all-of-schema", message, function (current) {
        var _this = this;
        return schemas.every(function (s) { return s.isValidSync(current, _this.options); });
    });
};
/**
 * To validate against oneOf, the given data must be valid against exactly one of the given subschemas.
 */
exports.createOneOfSchema = function (_a, jsonSchema) {
    var key = _a[0], value = _a[1];
    var path = utils_1.joinPath(value.description, "oneOf");
    var message = config_1.getError(path) || lodash_1.capitalize(key + " does not match one alternative");
    var schemas = value.oneOf.map(function (val, i) {
        return __1["default"]([key + "[" + i + "]", val], jsonSchema);
    });
    return addMethods_1["default"].mixed().test("one-of-schema", message, function (current) {
        var _this = this;
        return (schemas.filter(function (s) { return s.isValidSync(current, _this.options); }).length === 1);
    });
};
/**
 * The not keyword declares that an instance validates if it doesn’t validate against the given subschema.
 */
exports.createNotSchema = function (_a, jsonSchema) {
    var key = _a[0], value = _a[1];
    var path = utils_1.joinPath(value.description, "not");
    var message = config_1.getError(path) || lodash_1.capitalize(key + " matches alternatives");
    var schema = __1["default"]([key, value.not], jsonSchema);
    return addMethods_1["default"].mixed().test("not-schema", message, function (current) {
        return schema.isValidSync(current, this.options) === false;
    });
};
//# sourceMappingURL=index.js.map