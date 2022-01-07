"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var isArray_1 = __importDefault(require("lodash/isArray"));
var isString_1 = __importDefault(require("lodash/isString"));
var isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var uniq_1 = __importDefault(require("lodash/uniq"));
var stringify_object_1 = __importDefault(require("stringify-object"));
var schema_1 = require("../../schema");
/**
 * Checks if input is one of enum
 */
exports.isValueEnum = function (enums, value) {
    return isArray_1["default"](enums) && enums.some(function (item) { return isEqual_1["default"](item, value); });
};
/**
 * Validates the value from the schema items property. In addition,
 * validates const and enums for string, number and integers
 */
exports.validateItemsArray = function (items) { return function (item, index) {
    var schemaItem = schema_1.getItemsArrayItem(items, index);
    if (!schema_1.isSchemaObject(schemaItem))
        return false;
    var type = schemaItem.type, enums = schemaItem["enum"], consts = schemaItem["const"];
    // Items do not support multiple types
    if (!isString_1["default"](type) || !schema_1.isTypeOfValue[type](item))
        return false;
    // enums and consts are only applicable to
    // types, numbers and integers
    if (type === schema_1.DataTypes.STRING ||
        type === schema_1.DataTypes.NUMBER ||
        type === schema_1.DataTypes.INTEGER ||
        type === schema_1.DataTypes.ARRAY) {
        if (enums && !exports.isValueEnum(enums, item))
            return false;
        if ((consts || consts === null || consts === 0) && !isEqual_1["default"](item, consts))
            return false;
    }
    return true;
}; };
/**
 * Check if each array values is unique
 */
exports.isUnique = function (arr) {
    /** Convert array values to string in order to do value comparisons*/
    var normalizedArr = arr.map(function (item) {
        if (isArray_1["default"](item) || isPlainObject_1["default"](item))
            return stringify_object_1["default"](item).replace(/\s/g, "");
        return item;
    });
    return uniq_1["default"](normalizedArr).length === normalizedArr.length;
};
//# sourceMappingURL=utils.js.map