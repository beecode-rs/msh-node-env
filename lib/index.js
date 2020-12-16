"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.naming = exports.logger = exports.location = exports.MshNodeEnv = void 0;
const convert_1 = require("./convert");
const env_1 = require("./env");
const location_1 = require("./location");
const logger_1 = require("./logger");
const naming_1 = require("./naming");
const MshNodeEnv = (params = {}) => {
    var _a, _b, _c;
    const loggerStrategy = (_a = params.loggerStrategy) !== null && _a !== void 0 ? _a : new logger_1.NoLogger();
    const locationStrategies = (_b = params.locationStrategies) !== null && _b !== void 0 ? _b : [new location_1.EnvironmentLocation()];
    const namingStrategies = (_c = params.namingStrategies) !== null && _c !== void 0 ? _c : [new naming_1.SimpleName()];
    return (name) => {
        return new convert_1.BaseConvert(new env_1.Env({ locationStrategies, loggerStrategy, namingStrategies, name }));
    };
};
exports.MshNodeEnv = MshNodeEnv;
exports.default = exports.MshNodeEnv;
exports.location = __importStar(require("./location"));
exports.logger = __importStar(require("./logger"));
exports.naming = __importStar(require("./naming"));
//# sourceMappingURL=index.js.map