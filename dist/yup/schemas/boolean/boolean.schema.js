"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var isBoolean_1 = __importDefault(require("lodash/isBoolean"));
var capitalize_1 = __importDefault(require("lodash/capitalize"));
var addMethods_1 = __importDefault(require("../../addMethods"));
var required_1 = require("../required");
var constant_1 = require("../constant");
var config_1 = require("../../config/");
/**
 * Initializes a yup boolean schema derived from a json boolean schema
 */
var createBooleanSchema = function (_a, jsonSchema) {
    var key = _a[0], value = _a[1];
    var defaults = value["default"], title = value.title;
    var label = title || capitalize_1["default"](key);
    var defaultMessage = config_1.getError("defaults.boolean") || label + " is not of type boolean";
    var Schema = addMethods_1["default"].boolean().typeError(defaultMessage);
    if (isBoolean_1["default"](defaults)) {
        Schema = Schema.concat(Schema["default"](defaults));
    }
    /** Determine if schema matches constant */
    Schema = constant_1.createConstantSchema(Schema, [key, value]);
    /** Set required if ID is in required schema */
    Schema = required_1.createRequiredSchema(Schema, jsonSchema, [key, value]);
    return Schema;
};
exports["default"] = createBooleanSchema;
//# sourceMappingURL=boolean.schema.js.map