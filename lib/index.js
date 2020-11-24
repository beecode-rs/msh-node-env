"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
const simple_env_lookup_1 = require("./env-location/simple-env-lookup");
exports.default = (params = {}) => {
    const locationStrategy = params.locationStrategy ?? new simple_env_lookup_1.SimpleEnvLookup();
    return (name) => {
        return new env_1.Env({ locationStrategy, name });
    };
};
//# sourceMappingURL=index.js.map