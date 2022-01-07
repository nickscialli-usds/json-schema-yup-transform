"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var isNumber_1 = __importDefault(require("lodash/isNumber"));
var isString_1 = __importDefault(require("lodash/isString"));
var isArray_1 = __importDefault(require("lodash/isArray"));
var capitalize_1 = __importDefault(require("lodash/capitalize"));
var schema_1 = require("../../../schema");
var addMethods_1 = __importDefault(require("../../addMethods"));
var required_1 = require("../required");
var constant_1 = require("../constant");
var enumerables_1 = require("../enumerables");
var config_1 = require("../../config/");
var utils_1 = require("../../utils");
/**
 * Initializes a yup array schema derived from a json boolean schema
 */
var createArraySchema = function (_a, jsonSchema) {
    var key = _a[0], value = _a[1];
    var description = value.description, defaults = value["default"], minItems = value.minItems, maxItems = value.maxItems, items = value.items, contains = value.contains, uniqueItems = value.uniqueItems, title = value.title;
    var label = title || capitalize_1["default"](key);
    var defaultMessage = config_1.getError("defaults.array") || label + " is not of type array";
    var Schema = addMethods_1["default"].array().typeError(defaultMessage);
    if (isArray_1["default"](defaults)) {
        Schema = Schema.concat(Schema["default"](defaults));
    }
    /** Set required if ID is in required schema */
    Schema = required_1.createRequiredSchema(Schema, jsonSchema, [key, value]);
    // Items key expects all values to be of same type
    // Contains key expects one of the values to be of a type
    // These rules will conflict with each other so only
    // allow one or the other
    if (contains) {
        var type = contains.type;
        var path = utils_1.joinPath(description, "contains");
        var message = config_1.getError(path) ||
            capitalize_1["default"](key + " must at least contain one item of type " + type);
        // `contains` is a custom yup method. See /yup/addons/index.ts
        // for implementation
        Schema = isString_1["default"](type)
            ? Schema.concat(Schema.contains(type, message))
            : Schema;
    }
    else {
        if (schema_1.isItemsArray(items)) {
            var path = utils_1.joinPath(description, "tuple");
            var message = config_1.getError(path) || capitalize_1["default"](key + " must be of same type");
            // `tuple` is a custom yup method. See /yup/addons/index.ts
            // for implementation
            Schema = Schema.concat(Schema.tuple(items, message));
        }
    }
    if (isNumber_1["default"](minItems)) {
        var path = utils_1.joinPath(description, "minItems");
        var message = config_1.getError(path) ||
            capitalize_1["default"](key + " requires a minimum of " + minItems + " items");
        // `minimumItems` is a custom yup method. See /yup/addons/index.ts
        // for implementation
        Schema = Schema.concat(Schema.minimumItems(minItems, message));
    }
    if (isNumber_1["default"](maxItems)) {
        var path = utils_1.joinPath(description, "maxItems");
        var message = config_1.getError(path) ||
            capitalize_1["default"](key + " cannot exceed a maximum of " + maxItems + " items");
        // `maximumItems` is a custom yup method. See /yup/addons/index.ts
        // for implementation
        Schema = Schema.concat(Schema.maximumItems(maxItems, message));
    }
    /** Determine if schema matches constant */
    Schema = constant_1.createConstantSchema(Schema, [key, value]);
    /** Determine if schema matches any enums */
    Schema = enumerables_1.createEnumerableSchema(Schema, [key, value]);
    if (uniqueItems) {
        var path = utils_1.joinPath(description, "uniqueItems");
        var message = config_1.getError(path) || capitalize_1["default"](key + " values are not unique");
        // `uniqueItems` is a custom yup method. See /yup/addons/index.ts
        // for implementation
        Schema = Schema.concat(Schema.uniqueItems(uniqueItems, message));
    }
    return Schema;
};
exports["default"] = createArraySchema;
//# sourceMappingURL=array.schema.js.map