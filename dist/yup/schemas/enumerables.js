"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var isArray_1 = __importDefault(require("lodash/isArray"));
var capitalize_1 = __importDefault(require("lodash/capitalize"));
var config_1 = require("../config");
var utils_1 = require("../utils");
/**
 * Add enum yup method when schema enum is declared
 */
exports.createEnumerableSchema = function (Schema, _a) {
    var key = _a[0], value = _a[1];
    var enums = value["enum"], description = value.description;
    if (isArray_1["default"](enums)) {
        var path = utils_1.joinPath(description, "enum");
        var message = config_1.getError(path) ||
            capitalize_1["default"](key + " does not match any of the enumerables");
        Schema = Schema.concat(Schema["enum"](enums, message));
    }
    return Schema;
};
//# sourceMappingURL=enumerables.js.map