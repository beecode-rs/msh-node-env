"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MshNodeEnv = void 0;
const env_factory_1 = require("./env/env-factory");
const environment_location_1 = require("./location/environment-location");
const simple_name_1 = require("./naming/simple-name");
const logger_1 = require("./util/logger");
const MshNodeEnv = (params = {}) => {
    const { locationStrategies = [new environment_location_1.EnvironmentLocation()], namingStrategies = [new simple_name_1.SimpleName()] } = params;
    return (...names) => {
        (0, logger_1.logger)().debug(`Initiate env: [${names.join(', ')}]`);
        return new env_factory_1.EnvFactory({ locationStrategies, namingStrategies, names: [...names] });
    };
};
exports.MshNodeEnv = MshNodeEnv;
//# sourceMappingURL=index.js.map