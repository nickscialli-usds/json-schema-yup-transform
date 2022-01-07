"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var capitalize_1 = __importDefault(require("lodash/capitalize"));
var schema_1 = require("../../schema");
var config_1 = require("../config");
var utils_1 = require("../utils");
/**
 * Add required schema should subschema is required
 */
exports.createRequiredSchema = function (Schema, jsonSchema, _a) {
    var key = _a[0], value = _a[1];
    if (!schema_1.isRequiredField(jsonSchema, key))
        return Schema;
    var description = value.description, title = value.title;
    var label = title || capitalize_1["default"](key);
    var path = utils_1.joinPath(description, "required");
    var message = config_1.getError(path) || label + " is required";
    return Schema.concat(Schema.required(message));
};
//# sourceMappingURL=required.js.map