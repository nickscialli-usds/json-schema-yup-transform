"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
exports.__esModule = true;
var isArray_1 = __importDefault(require("lodash/isArray"));
var isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
var isNull_1 = __importDefault(require("lodash/isNull"));
var isString_1 = __importDefault(require("lodash/isString"));
var isNumber_1 = __importDefault(require("lodash/isNumber"));
var isBoolean_1 = __importDefault(require("lodash/isBoolean"));
var isInteger_1 = __importDefault(require("lodash/isInteger"));
var selectors_1 = require("./selectors");
var types_1 = require("./types");
/**
 * Returns a boolean if ID is a required field
 */
exports.isRequiredField = function (schema, id) {
    var requiredList = selectors_1.getRequired(schema);
    return isArray_1["default"](requiredList) && requiredList.includes(id);
};
/**
 * Hash table to determine field values are
 * the expected data type. Primarily used in Yup Lazy
 * to ensure the field value type are supported
 */
exports.isTypeOfValue = (_a = {},
    _a[types_1.DataTypes.STRING] = isString_1["default"],
    _a[types_1.DataTypes.NUMBER] = isNumber_1["default"],
    _a[types_1.DataTypes.BOOLEAN] = isBoolean_1["default"],
    _a[types_1.DataTypes.OBJECT] = isPlainObject_1["default"],
    _a[types_1.DataTypes.NULL] = isNull_1["default"],
    _a[types_1.DataTypes.ARRAY] = isArray_1["default"],
    _a[types_1.DataTypes.INTEGER] = isInteger_1["default"],
    _a);
//# sourceMappingURL=utils.js.map