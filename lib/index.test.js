"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_factory_1 = require("./env/env-factory");
const index_1 = require("./index");
const environment_location_1 = require("./location/environment-location");
const simple_name_1 = require("./naming/simple-name");
const logger_1 = require("./util/logger");
jest.mock('./location/environment-location');
jest.mock('./naming/simple-name');
jest.mock('./env/env-factory');
jest.mock('./util/logger');
describe('MshNodeEnv', () => {
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });
    it('should all default strategies', () => {
        const result = (0, index_1.MshNodeEnv)();
        expect(environment_location_1.EnvironmentLocation).toHaveBeenCalledTimes(1);
        expect(simple_name_1.SimpleName).toHaveBeenCalledTimes(1);
        expect(env_factory_1.EnvFactory).not.toHaveBeenCalled();
        expect(typeof result).toEqual('function');
    });
    it('should pass all default strategy to Env on env used', () => {
        const env = (0, index_1.MshNodeEnv)();
        const name = 'TEST';
        const envResult = env(name);
        expect(env_factory_1.EnvFactory).toHaveBeenCalledTimes(1);
        expect((0, logger_1.logger)().debug).toHaveBeenCalledTimes(1);
        expect((0, logger_1.logger)().debug).toHaveBeenCalledWith(`Initiate env: [${name}]`);
        expect(env_factory_1.EnvFactory).toHaveBeenCalledTimes(1);
        expect(env_factory_1.EnvFactory).toHaveBeenCalledWith({
            names: [name],
            locationStrategies: [expect.any(environment_location_1.EnvironmentLocation)],
            namingStrategies: [expect.any(simple_name_1.SimpleName)],
        });
        expect(envResult instanceof env_factory_1.EnvFactory).toBeTruthy();
    });
    it('should not use default strategies if all are passed in constructor', () => {
        const userEnvironmentLocation = new environment_location_1.EnvironmentLocation();
        const userSimpleName = new simple_name_1.SimpleName();
        jest.resetAllMocks();
        const env = (0, index_1.MshNodeEnv)({ locationStrategies: [userEnvironmentLocation], namingStrategies: [userSimpleName] });
        const name = 'TEST';
        env(name);
        expect(environment_location_1.EnvironmentLocation).not.toHaveBeenCalled();
        expect(simple_name_1.SimpleName).not.toHaveBeenCalled();
        expect(env_factory_1.EnvFactory).toHaveBeenCalledTimes(1);
        expect(env_factory_1.EnvFactory).toHaveBeenCalledWith({
            names: [name],
            locationStrategies: [userEnvironmentLocation],
            namingStrategies: [userSimpleName],
        });
    });
});
//# sourceMappingURL=index.test.js.map