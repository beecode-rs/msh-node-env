"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MshNodeEnv = void 0;
const env_1 = require("./env");
const location_1 = require("./location");
const logger_1 = require("./logger");
const MshNodeEnv = (params = {}) => {
    const locationStrategy = params.locationStrategy ?? new location_1.SimpleEnvLookup();
    const loggerStrategy = params.loggerStrategy ?? new logger_1.NoneLogger();
    return (name) => {
        return new env_1.Env({ locationStrategy, loggerStrategy, name });
    };
};
exports.MshNodeEnv = MshNodeEnv;
exports.default = exports.MshNodeEnv;
//# sourceMappingURL=index.js.map