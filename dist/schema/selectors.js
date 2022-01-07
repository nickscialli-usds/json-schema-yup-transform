"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var get_1 = __importDefault(require("lodash/get"));
var nth_1 = __importDefault(require("lodash/nth"));
var findKey_1 = __importDefault(require("lodash/findKey"));
var constants_1 = require("./constants");
var types_1 = require("./types");
/**
 * Retrieve definitions property value
 */
exports.getDefinitions = function (schema) { return schema.definitions; };
/**
 * Retrieve definition object from given reference id
 */
exports.getDefinitionItem = function (schema, ref) {
    var definitions = exports.getDefinitions(schema);
    if (!definitions) {
        return;
    }
    var path = get$RefValue(ref);
    if (path.startsWith("#")) {
        var key = findKey_1["default"](definitions, function (item) { return types_1.isSchemaObject(item) && item.$id === path; });
        return key ? get_1["default"](definitions, key) : undefined;
    }
    return get_1["default"](definitions, path);
};
/**
 * Retrieve properties property value
 */
exports.getProperties = function (schema) { return schema.properties; };
exports.getPropertyType = function (propertyItem) { return propertyItem.type; };
exports.getCompositionType = function (propertyItem) {
    return (propertyItem.anyOf && types_1.CompositSchemaTypes.ANYOF) ||
        (propertyItem.allOf && types_1.CompositSchemaTypes.ALLOF) ||
        (propertyItem.oneOf && types_1.CompositSchemaTypes.ONEOF) ||
        (propertyItem.not && types_1.CompositSchemaTypes.NOT);
};
/**
 * Retrieve required property value
 */
exports.getRequired = function (schema) {
    return schema.required;
};
/**
 * Retrieve reference id from `$ref` attribute
 */
var get$RefValue = function (ref) {
    // support for both definition key and referencing the $id directly
    if (ref.startsWith(constants_1.DEFINITION_ROOT)) {
        return ref.substring(constants_1.DEFINITION_ROOT.length).replace(/\//g, ".");
    }
    return ref;
};
/**
 * Returns an item from array items tuple
 */
exports.getItemsArrayItem = function (items, index) { return nth_1["default"](items, index); };
//# sourceMappingURL=selectors.js.map