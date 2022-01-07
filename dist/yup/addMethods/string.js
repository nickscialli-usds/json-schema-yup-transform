"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var is_relative_url_1 = __importDefault(require("is-relative-url"));
/**
 * Validates that url format is of a relative url
 */
function urlReference(message) {
    return this.test("test-urlReference", message, function (input) {
        var _a = this, path = _a.path, createError = _a.createError;
        return is_relative_url_1["default"](input) || createError({ path: path, message: message });
    });
}
exports.urlReference = urlReference;
//# sourceMappingURL=string.js.map