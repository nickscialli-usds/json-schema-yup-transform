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
var isArray_1 = __importDefault(require("lodash/isArray"));
var isString_1 = __importDefault(require("lodash/isString"));
var get_1 = __importDefault(require("lodash/get"));
var has_1 = __importDefault(require("lodash/has"));
var array_1 = __importDefault(require("./array"));
var boolean_1 = __importDefault(require("./boolean"));
var integer_1 = __importDefault(require("./integer"));
var object_1 = __importDefault(require("./object"));
var null_1 = __importDefault(require("./null"));
var number_1 = __importDefault(require("./number"));
var string_1 = __importDefault(require("./string"));
var addMethods_1 = __importDefault(require("../addMethods/"));
var schema_1 = require("../../schema/");
var composition_1 = require("./composition");
/**
 * Validates the input data type against the schema type and returns
 * the current type in order to generate the schema
 */
var getTypeOfValue = function (types, value) {
    var filteredType = types.filter(function (item) { return has_1["default"](schema_1.isTypeOfValue, item) && schema_1.isTypeOfValue[item](value); });
    var index = types.indexOf(filteredType[0]);
    return types[index];
};
/**
 * Determine which validation method to use by data type
 */
var getValidationSchema = function (_a, jsonSchema) {
    var _b;
    var key = _a[0], value = _a[1];
    if (schema_1.hasAnyOf(value)) {
        return composition_1.createAnyOfSchema([key, value], jsonSchema);
    }
    if (schema_1.hasAllOf(value)) {
        return composition_1.createAllOfSchema([key, value], jsonSchema);
    }
    if (schema_1.hasOneOf(value)) {
        return composition_1.createOneOfSchema([key, value], jsonSchema);
    }
    if (schema_1.hasNot(value)) {
        return composition_1.createNotSchema([key, value], jsonSchema);
    }
    var type = value.type;
    var schemaMap = (_b = {},
        _b[schema_1.DataTypes.STRING] = string_1["default"],
        _b[schema_1.DataTypes.NUMBER] = number_1["default"],
        _b[schema_1.DataTypes.INTEGER] = integer_1["default"],
        _b[schema_1.DataTypes.ARRAY] = array_1["default"],
        _b[schema_1.DataTypes.BOOLEAN] = boolean_1["default"],
        _b[schema_1.DataTypes.NULL] = null_1["default"],
        _b[schema_1.DataTypes.OBJECT] = object_1["default"],
        _b);
    return schemaMap[type]([key, value], jsonSchema);
};
/**
 * Initialises a Yup lazy instance that will determine which
 * schema to use based on the field value
 */
var getLazyValidationSchema = function (_a, jsonSchema) {
    var key = _a[0], value = _a[1];
    return addMethods_1["default"].lazy(function (inputValue) {
        var type = get_1["default"](value, "type");
        // include a check for undefined as Formik 2.1.4
        // coeerces empty strings to undefined
        var valueType = type.includes("null")
            ? inputValue === "" || inputValue === undefined
                ? null
                : inputValue
            : inputValue;
        var typeOfValue = getTypeOfValue(type, valueType) || null;
        var newItem = [key, __assign(__assign({}, value), { type: typeOfValue })];
        return getValidationSchema(newItem, jsonSchema);
    });
};
/**
 * Generate yup validation schema from properties within
 * the valid schema
 */
var createValidationSchema = function (_a, jsonSchema) {
    var key = _a[0], value = _a[1];
    var type = schema_1.getPropertyType(value) || schema_1.getCompositionType(value);
    if (isArray_1["default"](type)) {
        return getLazyValidationSchema([key, value], jsonSchema);
    }
    if (isString_1["default"](type)) {
        return getValidationSchema([key, value], jsonSchema);
    }
    throw new Error("Type key is missing");
};
exports["default"] = createValidationSchema;
//# sourceMappingURL=index.js.map