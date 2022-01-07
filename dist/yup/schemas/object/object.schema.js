"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var capitalize_1 = __importDefault(require("lodash/capitalize"));
var addMethods_1 = __importDefault(require("../../addMethods"));
var required_1 = require("../required");
var config_1 = require("../../config/");
/**
 * Initializes a yup object schema derived from a json object schema
 */
var createObjectSchema = function (_a, jsonSchema) {
    var key = _a[0], value = _a[1];
    var title = value.title;
    var label = title || capitalize_1["default"](key);
    var defaultMessage = config_1.getError("defaults.object") || label + " is not of type object";
    var Schema = addMethods_1["default"].object().typeError(defaultMessage);
    /** Set required if ID is in required schema */
    Schema = required_1.createRequiredSchema(Schema, jsonSchema, [key, value]);
    return Schema;
};
exports["default"] = createObjectSchema;
//# sourceMappingURL=object.schema.js.map