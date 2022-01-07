"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var isNumber_1 = __importDefault(require("lodash/isNumber"));
var isString_1 = __importDefault(require("lodash/isString"));
var capitalize_1 = __importDefault(require("lodash/capitalize"));
var addMethods_1 = __importDefault(require("../../addMethods"));
var string_constants_1 = require("./string.constants");
var schema_1 = require("../../../schema");
var required_1 = require("../required");
var constant_1 = require("../constant");
var enumerables_1 = require("../enumerables");
var config_1 = require("../../config/");
var utils_1 = require("../../utils");
/**
 * Initializes a yup string schema derived from a json string schema
 */
var createStringSchema = function (_a, jsonSchema) {
    var key = _a[0], value = _a[1];
    var description = value.description, defaults = value["default"], minLength = value.minLength, maxLength = value.maxLength, pattern = value.pattern, format = value.format, regex = value.regex, title = value.title;
    var label = title || capitalize_1["default"](key);
    var defaultMessage = config_1.getError("defaults.string") || label + " is not of type string";
    var Schema = addMethods_1["default"].string().typeError(defaultMessage);
    if (isString_1["default"](defaults)) {
        Schema = Schema.concat(Schema["default"](defaults));
    }
    /** Set required if ID is in required schema */
    Schema = required_1.createRequiredSchema(Schema, jsonSchema, [key, value]);
    /** Determine if schema matches constant */
    Schema = constant_1.createConstantSchema(Schema, [key, value]);
    /** Determine if schema matches any enums */
    Schema = enumerables_1.createEnumerableSchema(Schema, [key, value]);
    if (isNumber_1["default"](minLength)) {
        var path = utils_1.joinPath(description, "minLength");
        var message = config_1.getError(path) ||
            label + " requires a minimum of " + minLength + " characters";
        Schema = Schema.concat(Schema.min(minLength, message));
    }
    if (isNumber_1["default"](maxLength)) {
        var path = utils_1.joinPath(description, "maxLength");
        var message = config_1.getError(path) ||
            label + " cannot exceed a maximum of " + maxLength + " characters";
        Schema = Schema.concat(Schema.max(maxLength, message));
    }
    if (schema_1.isRegex(pattern)) {
        var path = utils_1.joinPath(description, "pattern");
        var message = config_1.getError(path) || label + " is an incorrect format";
        Schema = Schema.concat(Schema.matches(pattern, message));
    }
    if (schema_1.isRegex(regex)) {
        var path = utils_1.joinPath(description, "regex");
        var message = config_1.getError(path) || label + " is an incorrect format";
        Schema = Schema.concat(Schema.matches(regex, message));
    }
    if (format) {
        Schema = exports.stringSchemaFormat([key, value], Schema);
    }
    return Schema;
};
exports.stringSchemaFormat = function (_a, Schema) {
    var key = _a[0], value = _a[1];
    var format = value.format, description = value.description, title = value.title;
    var label = title || capitalize_1["default"](key);
    if (format === "date-time") {
        var path = utils_1.joinPath(description, "format.dateTime");
        var message = config_1.getError(path) || label + " is an invalid date and time format";
        Schema = Schema.concat(Schema.matches(string_constants_1.ISO_8601_DATE_TIME_REGEX, message));
    }
    if (format === "time") {
        var path = utils_1.joinPath(description, "format.time");
        var message = config_1.getError(path) || label + " is an invalid time format";
        Schema = Schema.concat(Schema.matches(string_constants_1.ISO_8601_TIME_REGEX, message));
    }
    if (format === "date") {
        var path = utils_1.joinPath(description, "format.date");
        var message = config_1.getError(path) || label + " is an invalid date format";
        Schema = Schema.concat(Schema.matches(string_constants_1.DATE_REGEX, message));
    }
    // email
    if (format === "email") {
        var path = utils_1.joinPath(description, "format.email");
        var message = config_1.getError(path) || label + " is an invalid email format";
        Schema = Schema.concat(Schema.email(message));
    }
    // international email format
    if (format === "idn-email") {
        var path = utils_1.joinPath(description, "format.idnEmail");
        var message = config_1.getError(path) || label + " is an invalid international email format";
        Schema = Schema.concat(Schema.matches(string_constants_1.INTERNATIONAL_EMAIL_REGEX, message));
    }
    // hostnames
    if (format === "hostname") {
        var path = utils_1.joinPath(description, "format.hostname");
        var message = config_1.getError(path) || label + " is an invalid hostname format";
        Schema = Schema.concat(Schema.matches(string_constants_1.HOSTNAME_REGEX, message));
    }
    if (format === "idn-hostname") {
        var path = utils_1.joinPath(description, "format.idnHostname");
        var message = config_1.getError(path) || label + " is an invalid international hostname format";
        Schema = Schema.concat(Schema.matches(string_constants_1.INTERNATIONAL_HOSTNAME_REGEX, message));
    }
    // ip addresses
    if (format === "ipv4") {
        var path = utils_1.joinPath(description, "format.ipv4");
        var message = config_1.getError(path) || label + " is an invalid ipv4 format";
        Schema = Schema.concat(Schema.matches(string_constants_1.IPV4_REGEX, message));
    }
    if (format === "ipv6") {
        var path = utils_1.joinPath(description, "format.ipv6");
        var message = config_1.getError(path) || label + " is an invalid ipv6 format";
        Schema = Schema.concat(Schema.matches(string_constants_1.IPV6_REGEX, message));
    }
    // resource identifiers
    if (format === "uri") {
        var path = utils_1.joinPath(description, "format.uri");
        var message = config_1.getError(path) || label + " is an invalid URI format";
        Schema = Schema.concat(Schema.url(message));
    }
    if (format === "uri-reference") {
        var path = utils_1.joinPath(description, "format.uriReference");
        var message = config_1.getError(path) || label + " is an invalid URI reference format";
        // `urlReference` is a custom yup method. See /yup/addons/index.ts
        // for implementation
        Schema = Schema.concat(Schema.urlReference(message));
    }
    if (format === "iri") {
        console.warn("iri format is not supported");
    }
    if (format === "iri-reference") {
        console.warn("iri-reference format is not supported");
    }
    return Schema;
};
exports["default"] = createStringSchema;
//# sourceMappingURL=string.schema.js.map