"use strict";
exports.__esModule = true;
/**
 * Validates a given number is a multiple of the schema multipleOf value
 */
function multipleOf(value, message) {
    return this.test("test-multipleOf", message, function (input) {
        var _a = this, path = _a.path, createError = _a.createError;
        return input % value === 0 || createError({ path: path, message: message });
    });
}
exports.multipleOf = multipleOf;
//# sourceMappingURL=number.js.map