"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MshNodeEnv = void 0;
const base_convert_1 = require("./convert/base-convert");
const env_1 = require("./env/env");
const environment_location_1 = require("./location/environment-location");
const simple_name_1 = require("./naming/simple-name");
const logger_util_1 = require("./util/logger-util");
const msh_node_log_1 = require("@beecode/msh-node-log");
const MshNodeEnv = (params = {}) => {
    var _a, _b, _c;
    const logger = (_a = params.loggerStrategy) !== null && _a !== void 0 ? _a : new msh_node_log_1.NoLogger();
    logger_util_1.loggerUtil.setLogger(logger);
    const locationStrategies = (_b = params.locationStrategies) !== null && _b !== void 0 ? _b : [new environment_location_1.EnvironmentLocation()];
    const namingStrategies = (_c = params.namingStrategies) !== null && _c !== void 0 ? _c : [new simple_name_1.SimpleName()];
    return (name) => {
        logger.debug(`Initiate env: "${name}"`);
        return new base_convert_1.BaseConvert(new env_1.Env({ locationStrategies, namingStrategies, name }));
    };
};
exports.MshNodeEnv = MshNodeEnv;
//# sourceMappingURL=index.js.map