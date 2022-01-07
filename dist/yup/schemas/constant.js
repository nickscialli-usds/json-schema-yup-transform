"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var capitalize_1 = __importDefault(require("lodash/capitalize"));
var config_1 = require("../config");
var utils_1 = require("../utils");
/**
 * Add constant yup method when schema constant is declared
 */
exports.createConstantSchema = function (Schema, _a) {
    var key = _a[0], value = _a[1];
    var consts = value["const"], description = value.description;
    if (consts || consts === null || consts === 0) {
        var path = utils_1.joinPath(description, "const");
        var message = config_1.getError(path) || capitalize_1["default"](key + " does not match constant");
        Schema = Schema.concat(Schema.constant(consts, message));
    }
    return Schema;
};
//# sourceMappingURL=constant.js.map