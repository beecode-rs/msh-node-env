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
exports.logger = exports.location = exports.MshNodeEnv = void 0;
const convert_1 = require("./convert");
const env_1 = require("./env");
const location_1 = require("./location");
const logger_1 = require("./logger");
const MshNodeEnv = (params = {}) => {
    const locationStrategy = params.locationStrategy ?? new location_1.SimpleEnvLookup();
    const loggerStrategy = params.loggerStrategy ?? new logger_1.NoLogger();
    return (name) => {
        return new convert_1.BaseConvert(new env_1.Env({ locationStrategy, loggerStrategy, name }));
    };
};
exports.MshNodeEnv = MshNodeEnv;
exports.default = exports.MshNodeEnv;
exports.location = __importStar(require("./location"));
exports.logger = __importStar(require("./logger"));
//# sourceMappingURL=index.js.map