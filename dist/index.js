"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var yupTransformer = __importStar(require("./yup"));
var utils_1 = require("./yup/utils");
/**
 * Converts a valid schema to a yup schema
 */
var convertToYup = function (schema, config) {
    config && yupTransformer.setConfiguration(config);
    var normalizedSchema = utils_1.normalize(schema);
    return yupTransformer["default"](normalizedSchema);
};
exports["default"] = convertToYup;
//# sourceMappingURL=index.js.map