"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var get_1 = __importDefault(require("lodash/get"));
var head_1 = __importDefault(require("lodash/head"));
var isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
var isEmpty_1 = __importDefault(require("lodash/isEmpty"));
var isArray_1 = __importDefault(require("lodash/isArray"));
var transform_1 = __importDefault(require("lodash/transform"));
var flow_1 = __importDefault(require("lodash/flow"));
var has_1 = __importDefault(require("lodash/has"));
var schema_1 = require("../schema/");
/**
 * Concatenates the schema field path and schema key in order to retrieve error message
 * from configuration
 */
exports.joinPath = function (description, schemaKey) { return (description ? description + "." + schemaKey : false); };
/** Retrieves the first item in an object */
exports.getObjectHead = function (obj) {
    if (!isPlainObject_1["default"](obj) || isEmpty_1["default"](obj))
        return false;
    /** Get all keys from obj */
    var arr = Object.keys(obj);
    /** Grab the first key */
    var key = head_1["default"](arr);
    /** Grab the first item */
    var value = get_1["default"](obj, key);
    return [key, value];
};
/** Recursively removes any empty objects */
exports.removeEmptyObjects = function (schema) {
    var cleaner = function (result, value, key) {
        var isCollection = isPlainObject_1["default"](value);
        var cleaned = isCollection ? cleanObject(value) : value;
        if (isCollection && isEmpty_1["default"](cleaned))
            return;
        isArray_1["default"](result) ? result.push(cleaned) : (result[key] = cleaned);
    };
    var cleanObject = function (schema) { return transform_1["default"](schema, cleaner); };
    return isPlainObject_1["default"](schema) ? cleanObject(schema) : schema;
};
/** Replace all $ref instances with their definition */
exports.transformRefs = function (schema) {
    var replaceRefs = function (result, value, key) {
        var hasRef = get_1["default"](value, "$ref");
        var replaced = hasRef
            ? schema_1.getDefinitionItem(schema, get_1["default"](value, "$ref"))
            : isPlainObject_1["default"](value)
                ? replaceAllRefs(value)
                : value;
        result[key] = replaced;
    };
    var replaceAllRefs = function (schema) {
        return transform_1["default"](schema, replaceRefs);
    };
    return isPlainObject_1["default"](schema) ? replaceAllRefs(schema) : schema;
};
/**
 * Add type property to all if schema's using the id of that schema
 * to lookup the type in the properties schema
 * */
exports.applyIfTypes = function (schema) {
    var addType = function (schema) {
        return transform_1["default"](schema, function (result, value, key) {
            var _a;
            if (key === "if" && !isEmpty_1["default"](value)) {
                var properties = get_1["default"](schema, "properties");
                var ifProperties = get_1["default"](value, "properties");
                var ifSchema = ifProperties && exports.getObjectHead(ifProperties);
                if (ifSchema) {
                    var ifSchemaKey = ifSchema[0], ifSchemaValue = ifSchema[1];
                    var type = ifSchemaKey &&
                        !has_1["default"](ifProperties, [ifSchemaKey, "type"]) &&
                        has_1["default"](properties, ifSchemaKey) &&
                        get_1["default"](properties, [ifSchemaKey, "type"]);
                    value = type
                        ? __assign(__assign({}, value), { properties: __assign(__assign({}, ifProperties), (_a = {}, _a[ifSchemaKey] = __assign(__assign({}, ifSchemaValue), { type: type }), _a)) }) : value;
                }
            }
            result[key] = isPlainObject_1["default"](value) ? addType(value) : value;
        });
    };
    return isPlainObject_1["default"](schema) ? addType(schema) : schema;
};
/**
 * Iterate through schema and adds description property with the associated node path
 * This will remove any existing description values!
 */
exports.applyPaths = function (schema) {
    var invalidKeys = [
        "properties",
        "then",
        "if",
        "definitions",
        "else",
        "items"
    ];
    var addPath = function (schema, path) {
        if (path === void 0) { path = ""; }
        return transform_1["default"](schema, function (result, value, key) {
            /** Target field node only */
            var isField = has_1["default"](value, "type") && !has_1["default"](value, "properties");
            if (isField) {
                value = __assign(__assign({}, value), { description: "" + path + key });
            }
            /** Capture path of the field id only */
            var id = invalidKeys.includes(key) ? "" : key + ".";
            result[key] = isPlainObject_1["default"](value)
                ? addPath(value, "" + path + id)
                : value;
        });
    };
    return isPlainObject_1["default"](schema) ? addPath(schema) : schema;
};
/**
 * Normalizes schema to the required shape. Removes empty objects,
 * replaces $ref values with the related definition and adds
 * missing type properties to if schemas
 */
exports.normalize = function (schema) {
    var normalizer = flow_1["default"]([
        exports.removeEmptyObjects,
        exports.transformRefs,
        exports.applyPaths,
        exports.applyIfTypes
    ]);
    return normalizer(schema);
};
//# sourceMappingURL=utils.js.map