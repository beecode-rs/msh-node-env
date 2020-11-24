"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
const simple_env_lookup_1 = require("./env-location/simple-env-lookup");
exports.default = (envStrategy = new simple_env_lookup_1.SimpleEnvLookup()) => (envName) => {
    envStrategy.setEnvName(envName);
    return new env_1.Env(envStrategy);
};
//# sourceMappingURL=index.js.map