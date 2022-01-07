"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var Yup = __importStar(require("yup"));
var array_1 = require("./array");
var number_1 = require("./number");
var string_1 = require("./string");
var mixed_1 = require("./mixed");
// Array methods
Yup.addMethod(Yup.array, "minimumItems", array_1.minimumItems);
Yup.addMethod(Yup.array, "maximumItems", array_1.maximumItems);
Yup.addMethod(Yup.array, "contains", array_1.contains);
Yup.addMethod(Yup.array, "tuple", array_1.tuple);
Yup.addMethod(Yup.array, "uniqueItems", array_1.uniqueItems);
// Number methods
Yup.addMethod(Yup.number, "multipleOf", number_1.multipleOf);
// String methods
Yup.addMethod(Yup.string, "urlReference", string_1.urlReference);
// Mixed methods
Yup.addMethod(Yup.mixed, "constant", mixed_1.constant);
Yup.addMethod(Yup.mixed, "enum", mixed_1.enums);
exports["default"] = Yup;
//# sourceMappingURL=index.js.map