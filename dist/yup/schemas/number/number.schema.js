"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var isNumber_1 = __importDefault(require("lodash/isNumber"));
var capitalize_1 = __importDefault(require("lodash/capitalize"));
var addMethods_1 = __importDefault(require("../../addMethods"));
var required_1 = require("../required");
var constant_1 = require("../constant");
var enumerables_1 = require("../enumerables");
var config_1 = require("../../config/");
var utils_1 = require("../../utils");
/**
 * Initializes a yup number schema derived from a json number schema
 */
var createNumberSchema = function (_a, jsonSchema) {
    var key = _a[0], value = _a[1];
    var title = value.title;
    var label = title || capitalize_1["default"](key);
    var defaultMessage = config_1.getError("defaults.number") || label + " is not of type number";
    return exports.createBaseNumberSchema(addMethods_1["default"].number().typeError(defaultMessage), [key, value], jsonSchema);
};
/**
 * Generates a yup number schema instance that is used for both number and integer schema
 */
exports.createBaseNumberSchema = function (Schema, _a, jsonSchema) {
    var key = _a[0], value = _a[1];
    var description = value.description, defaults = value["default"], minimum = value.minimum, maximum = value.maximum, exclusiveMaximum = value.exclusiveMaximum, exclusiveMinimum = value.exclusiveMinimum, multipleOf = value.multipleOf, title = value.title;
    var label = title || capitalize_1["default"](key);
    var isMinNumber = isNumber_1["default"](minimum);
    var isMaxNumber = isNumber_1["default"](maximum);
    var isExclusiveMaxNumber = isNumber_1["default"](exclusiveMaximum);
    var isExclusiveMinNumber = isNumber_1["default"](exclusiveMinimum);
    if (isNumber_1["default"](defaults)) {
        Schema = Schema.concat(Schema["default"](defaults));
    }
    if (isExclusiveMinNumber && isMinNumber) {
        throw new Error("Minimum and exclusive minimum keys can not be used together");
    }
    if (isExclusiveMaxNumber && isMaxNumber) {
        throw new Error("Maximum and exclusive maximum keys can not be used together");
    }
    // Minimum value is inclusive
    if (isMinNumber) {
        var path = utils_1.joinPath(description, "minimum");
        var message = config_1.getError(path) ||
            capitalize_1["default"](label + " requires a minimum value of " + minimum);
        Schema = Schema.concat(Schema.min(minimum, message));
    }
    if (isExclusiveMinNumber) {
        var path = utils_1.joinPath(description, "exclusiveMinimum");
        var message = config_1.getError(path) ||
            capitalize_1["default"](label + " requires a exclusive minimum value of " + exclusiveMinimum);
        Schema = Schema.concat(Schema.min(exclusiveMinimum + 1, message));
    }
    // Maximum value is inclusive
    if (isMaxNumber) {
        var path = utils_1.joinPath(description, "maximum");
        var message = config_1.getError(path) ||
            capitalize_1["default"](label + " cannot exceed a maximum value of " + maximum);
        Schema = Schema.concat(Schema.max(maximum, message));
    }
    if (isExclusiveMaxNumber) {
        var path = utils_1.joinPath(description, "exclusiveMaximum");
        var message = config_1.getError(path) ||
            capitalize_1["default"](label + " cannot exceed a exclusive maximum value of " + exclusiveMaximum);
        Schema = Schema.concat(Schema.max(exclusiveMaximum - 1, message));
    }
    if (multipleOf) {
        var path = utils_1.joinPath(description, "multipleOf");
        var message = config_1.getError(path) ||
            capitalize_1["default"](label + " requires a multiple of " + multipleOf);
        // `multipleOf` is a custom yup method. See /yup/addons/index.ts
        // for implementation
        Schema = Schema.concat(Schema.multipleOf(multipleOf, message));
    }
    /** Determine if schema matches constant */
    Schema = constant_1.createConstantSchema(Schema, [key, value]);
    /** Determine if schema matches any enums */
    Schema = enumerables_1.createEnumerableSchema(Schema, [key, value]);
    /** Set required if ID is in required schema */
    Schema = required_1.createRequiredSchema(Schema, jsonSchema, [key, value]);
    return Schema;
};
exports["default"] = createNumberSchema;
//# sourceMappingURL=number.schema.js.map