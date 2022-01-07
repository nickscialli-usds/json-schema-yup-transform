"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var isArray_1 = __importDefault(require("lodash/isArray"));
var isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
var has_1 = __importDefault(require("lodash/has"));
/**
 * Schema Types
 */
var DataTypes;
(function (DataTypes) {
    DataTypes["STRING"] = "string";
    DataTypes["NUMBER"] = "number";
    DataTypes["ARRAY"] = "array";
    DataTypes["BOOLEAN"] = "boolean";
    DataTypes["OBJECT"] = "object";
    DataTypes["NULL"] = "null";
    DataTypes["INTEGER"] = "integer";
})(DataTypes = exports.DataTypes || (exports.DataTypes = {}));
/**
 * Composite schema types
 */
var CompositSchemaTypes;
(function (CompositSchemaTypes) {
    CompositSchemaTypes["ALLOF"] = "allOf";
    CompositSchemaTypes["ANYOF"] = "anyOf";
    CompositSchemaTypes["ONEOF"] = "oneOf";
    CompositSchemaTypes["NOT"] = "not";
})(CompositSchemaTypes = exports.CompositSchemaTypes || (exports.CompositSchemaTypes = {}));
var SchemaKeywords;
(function (SchemaKeywords) {
    SchemaKeywords["REQUIRED"] = "required";
    SchemaKeywords["ENUM"] = "enum";
    SchemaKeywords["CONST"] = "const";
    SchemaKeywords["FORMAT"] = "format";
    SchemaKeywords["DATE_TIME_FORMAT"] = "dateTime";
    SchemaKeywords["DATE_FORMAT"] = "date";
    SchemaKeywords["TIME_FORMAT"] = "time";
    SchemaKeywords["EMAIL_FORMAT"] = "email";
    SchemaKeywords["IDN_EMAIL_FORMAT"] = "idnEmail";
    SchemaKeywords["HOSTNAME_FORMAT"] = "hostname";
    SchemaKeywords["IDN_HOSTNAME_FORMAT"] = "idnHostname";
    SchemaKeywords["IPV4_FORMAT"] = "ipv4";
    SchemaKeywords["IPV6_FORMAT"] = "ipv6";
    SchemaKeywords["URI_FORMAT"] = "uri";
    SchemaKeywords["URI_REFERENCE_FORMAT"] = "uriReference";
    SchemaKeywords["MAXIMUM_LENGTH"] = "maxLength";
    SchemaKeywords["MINIMUM_LENGTH"] = "minLength";
    SchemaKeywords["PATTERN"] = "pattern";
    SchemaKeywords["MAXIMUM"] = "maximum";
    SchemaKeywords["MINIMUM"] = "minimum";
    SchemaKeywords["EXCLUSIVE_MINIMUM"] = "exclusiveMinimum";
    SchemaKeywords["EXCLUSIVE_MAXIMUM"] = "exclusiveMaximum";
    SchemaKeywords["MULTIPLE_OF"] = "multipleOf";
    SchemaKeywords["MINIMUM_ITEMS"] = "minItems";
    SchemaKeywords["MAXIMUM_ITEMS"] = "maxItems";
    SchemaKeywords["CONTAINS"] = "contains";
    SchemaKeywords["TUPLE"] = "tuple";
    SchemaKeywords["REGEX"] = "regex";
    SchemaKeywords["UNIQUE_ITEMS"] = "uniqueItems";
})(SchemaKeywords = exports.SchemaKeywords || (exports.SchemaKeywords = {}));
/**
 *  Object type guard array items key
 */
exports.isSchemaObject = function (items) { return isPlainObject_1["default"](items); };
/**
 * Tuple type guard array items key
 */
exports.isItemsArray = function (items) {
    return isArray_1["default"](items) && items.every(function (item) { return has_1["default"](item, "type"); });
};
/**
 * String pattern key type guard
 */
exports.isRegex = function (regexp) { return regexp; };
exports.hasAnyOf = function (value) {
    return !!value.anyOf;
};
exports.hasAllOf = function (value) {
    return !!value.allOf;
};
exports.hasOneOf = function (value) {
    return !!value.oneOf;
};
exports.hasNot = function (value) {
    return !!value.not;
};
//# sourceMappingURL=types.js.map