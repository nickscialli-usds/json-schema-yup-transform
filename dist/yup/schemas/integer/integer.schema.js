"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var capitalize_1 = __importDefault(require("lodash/capitalize"));
var addMethods_1 = __importDefault(require("../../addMethods"));
var number_1 = require("../number");
var config_1 = require("../../config/");
/**
 * Initializes a yup integer schema derived from a json humber schema
 */
var createIntegerSchema = function (_a, jsonSchema) {
    var key = _a[0], value = _a[1];
    var title = value.title;
    var label = title || capitalize_1["default"](key);
    var defaultMessage = config_1.getError("defaults.integer") || label + " is not of type integer";
    return number_1.createBaseNumberSchema(addMethods_1["default"].number().typeError(defaultMessage).integer().strict(true), [key, value], jsonSchema);
};
exports["default"] = createIntegerSchema;
//# sourceMappingURL=integer.schema.js.map