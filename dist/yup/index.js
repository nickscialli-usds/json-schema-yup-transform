"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var builder_1 = __importDefault(require("./builder"));
var config_1 = require("./config");
exports.setConfiguration = config_1.setConfiguration;
__export(require("./types"));
exports["default"] = builder_1["default"];
//# sourceMappingURL=index.js.map