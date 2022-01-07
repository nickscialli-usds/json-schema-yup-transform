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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var has_1 = __importDefault(require("lodash/has"));
var get_1 = __importDefault(require("lodash/get"));
var omit_1 = __importDefault(require("lodash/omit"));
var isPlainObject_1 = __importDefault(require("lodash/isPlainObject"));
var addMethods_1 = __importDefault(require("../addMethods/"));
var schema_1 = require("../../schema/");
var schemas_1 = __importDefault(require("../schemas/"));
var utils_1 = require("../utils");
/**
 * Iterate through each item in properties and generate a key value pair of yup schema
 */
var buildProperties = function (properties, jsonSchema) {
    var _a, _b, _c, _d;
    var schema = {};
    for (var _i = 0, _e = Object.entries(properties); _i < _e.length; _i++) {
        var _f = _e[_i], key = _f[0], value = _f[1];
        if (!schema_1.isSchemaObject(value)) {
            continue;
        }
        var properties_1 = value.properties, type = value.type, items = value.items;
        // if item is object type call this function again
        if (type === "object" && properties_1) {
            var objSchema = exports.build(value);
            if (objSchema) {
                var ObjectSchema = schemas_1["default"]([key, value], jsonSchema);
                schema = __assign(__assign({}, schema), (_a = {}, _a[key] = ObjectSchema.concat(objSchema), _a));
            }
        }
        else if (type === "array" &&
            schema_1.isSchemaObject(items) &&
            has_1["default"](items, "properties")) {
            /** Structured to handle nested objects in schema. First
             * an array with all the relevant validation rules need to
             * be applied and then the subschemas will be concatenated.
             */
            var ArraySchema = schemas_1["default"]([key, omit_1["default"](value, "items")], jsonSchema);
            schema = __assign(__assign({}, schema), (_b = {}, _b[key] = ArraySchema.concat(addMethods_1["default"].array(exports.build(items))), _b));
        }
        else if (type === "array" && schema_1.isSchemaObject(items)) {
            var ArraySchema = schemas_1["default"]([key, omit_1["default"](value, "items")], jsonSchema);
            schema = __assign(__assign({}, schema), (_c = {}, _c[key] = ArraySchema.concat(addMethods_1["default"].array(schemas_1["default"]([key, items], jsonSchema))), _c));
        }
        else {
            // check if item has a then or else schema
            var condition = hasIfSchema(jsonSchema, key)
                ? buildCondition(jsonSchema)
                : {};
            var newSchema = schemas_1["default"]([key, value], jsonSchema);
            schema = __assign(__assign(__assign({}, schema), (_d = {}, _d[key] = key in schema ? schema[key].concat(newSchema) : newSchema, _d)), condition);
        }
    }
    return schema;
};
/**
 * Determine schema has a if schema
 */
var hasIfSchema = function (jsonSchema, key) {
    var ifSchema = jsonSchema["if"], allOf = jsonSchema.allOf;
    var allOfIfSchemas = (allOf || [])
        .map(function (el) { return typeof el !== "boolean" && el["if"]; })
        .filter(function (el) { return el; });
    var schemas = __spreadArrays([ifSchema], allOfIfSchemas);
    return schemas.some(function (ifSchema) {
        if (!schema_1.isSchemaObject(ifSchema))
            return false;
        var properties = ifSchema.properties;
        return isPlainObject_1["default"](properties) && has_1["default"](properties, key);
    });
};
/**
 * High order function that takes json schema and property item
 * and generates a validation schema to validate the given value
 */
var isValidator = function (_a, jsonSchema) {
    var key = _a[0], value = _a[1];
    return function (val) {
        var conditionalSchema = schemas_1["default"]([key, value], jsonSchema);
        var result = conditionalSchema.isValidSync(val);
        return result;
    };
};
/** Build `is` and `then` validation schema */
var buildCondition = function (jsonSchema) {
    var allConditions = [];
    var topLevelCondition = {
        "if": jsonSchema["if"],
        then: jsonSchema.then,
        "else": jsonSchema["else"]
    };
    if (topLevelCondition["if"]) {
        allConditions.push(topLevelCondition);
    }
    var allOfSchemas = jsonSchema["allOf"] || [];
    allOfSchemas.forEach(function (schema) {
        if (typeof schema !== "boolean" && schema["if"]) {
            allConditions.push({
                "if": schema["if"],
                then: schema.then,
                "else": schema["else"]
            });
        }
    });
    allConditions = allConditions.filter(function (condition) { return condition["if"]; });
    if (allConditions.length === 0)
        return false;
    var conditionSchema = {};
    var _loop_1 = function (i) {
        var ifSchema = allConditions[i]["if"];
        if (!ifSchema || typeof ifSchema === "boolean")
            return "continue";
        var properties = ifSchema.properties;
        if (!properties)
            return { value: false };
        var ifSchemaHead = utils_1.getObjectHead(properties);
        if (!ifSchemaHead)
            return { value: false };
        var ifSchemaKey = ifSchemaHead[0], ifSchemaValue = ifSchemaHead[1];
        if (!schema_1.isSchemaObject(ifSchemaValue))
            return { value: false };
        var thenSchema = get_1["default"](allConditions[i], "then");
        var elseSchema = get_1["default"](allConditions[i], "else");
        if (schema_1.isSchemaObject(thenSchema)) {
            var properties_2 = thenSchema.properties, required = thenSchema.required;
            if (!properties_2)
                return { value: false };
            var _loop_2 = function (key, val) {
                var _a;
                if (!val || typeof val === "boolean")
                    return "continue";
                var item = {
                    properties: (_a = {}, _a[key] = __assign({}, val), _a)
                };
                if (required && required.includes(key)) {
                    item.required = [key];
                }
                var isValid = isValidator([ifSchemaKey, ifSchemaValue], item);
                var thenConditionSchema = buildConditionItem(item, [
                    ifSchemaKey,
                    function (val) { return isValid(val) === true; }
                ]);
                if (thenConditionSchema)
                    conditionSchema = Object.assign({}, conditionSchema, thenConditionSchema);
            };
            for (var _i = 0, _a = Object.entries(properties_2); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], val = _b[1];
                _loop_2(key, val);
            }
        }
        if (schema_1.isSchemaObject(elseSchema)) {
            var isValid_1 = isValidator([ifSchemaKey, ifSchemaValue], elseSchema);
            var elseConditionSchema = buildConditionItem(elseSchema, [
                ifSchemaKey,
                function (val) { return isValid_1(val) === false; }
            ]);
            if (!elseConditionSchema)
                return { value: false };
            conditionSchema = __assign(__assign({}, conditionSchema), elseConditionSchema);
        }
    };
    for (var i = 0; i < allConditions.length; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return conditionSchema;
};
/**
 * Build the then/else schema as a yup when schema
 */
var buildConditionItem = function (schema, _a) {
    var _b;
    var ifSchemaKey = _a[0], callback = _a[1];
    var properties = schema.properties;
    if (!properties)
        return false;
    var schemaHead = utils_1.getObjectHead(properties);
    if (!schemaHead)
        return false;
    var key = schemaHead[0];
    /**
     * Returns a key ( field name ) and value (generated schema) pair.
     * Note: This will contain any nested conditions!!
     * The recursion in `buildProperties` means the nested conditions
     * will already have been transformed to a when schema
     */
    var schemaData = buildProperties(properties, schema);
    if (!schemaData)
        return false;
    /**
     * Make a copy of schemaData and omit the current schema
     */
    var omitData = omit_1["default"](schemaData, key);
    /** Get the correct schema type to concat the when schema to */
    var Schema = schemaData[key];
    return __assign((_b = {}, _b[key] = addMethods_1["default"].mixed().when(ifSchemaKey, {
        is: callback,
        then: Schema
    }), _b), omitData);
};
/**
 * Iterates through a valid JSON Schema and generates yup field level
 * and object level schema
 */
exports.build = function (jsonSchema) {
    var properties = schema_1.getProperties(jsonSchema);
    if (!properties)
        return properties;
    var Schema = buildProperties(properties, jsonSchema);
    return addMethods_1["default"].object().shape(Schema);
};
exports["default"] = exports.build;
//# sourceMappingURL=index.js.map