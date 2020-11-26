"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
const simple_env_lookup_1 = require("./env-location/simple-env-lookup");
const none_logger_1 = require("./logger/none-logger");
exports.default = (params = {}) => {
    const locationStrategy = params.locationStrategy ?? new simple_env_lookup_1.SimpleEnvLookup();
    const loggerStrategy = params.loggerStrategy ?? new none_logger_1.NoneLogger();
    return (name) => {
        return new env_1.Env({ locationStrategy, loggerStrategy, name });
    };
};
//# sourceMappingURL=index.js.map