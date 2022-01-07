"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var addMethods_1 = __importDefault(require("../../addMethods"));
/**
 * Initializes a yup null schema. Allows fields to be optional.
 */
var createNullSchema = function () {
    // Mark the schema as not required. Passing undefined
    // as value will not fail validation.
    return addMethods_1["default"].mixed().notRequired();
};
exports["default"] = createNullSchema;
//# sourceMappingURL=null.schema.js.map