"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const docker_secrets_location_1 = require("./docker-secrets-location");
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
jest.mock('fs');
jest.mock('util');
describe('DockerSecretsLocation', () => {
    describe('valueByName', () => {
        afterEach(() => {
            jest.resetAllMocks();
            jest.restoreAllMocks();
        });
        it('should call fs and util', () => {
            const fsResult = 'fs-result';
            const utilResult = 'util-result';
            const envName = 'test';
            util_1.default.format.mockReturnValue(utilResult);
            fs_1.default.readFileSync.mockReturnValue(fsResult);
            const dockerSecretsLocation = new docker_secrets_location_1.DockerSecretsLocation();
            const result = dockerSecretsLocation.valueByName(envName);
            expect(util_1.default.format).toHaveBeenCalledTimes(1);
            expect(util_1.default.format).toHaveBeenCalledWith('/run/secrets/%s', envName);
            expect(fs_1.default.readFileSync).toHaveBeenCalledTimes(1);
            expect(fs_1.default.readFileSync).toHaveBeenCalledWith(utilResult, 'utf8');
            expect(result).toEqual(fsResult);
        });
        it('should return undefined if util throws an error', () => {
            ;
            util_1.default.format.mockImplementation(() => new Error('boom'));
            const dockerSecretsLocation = new docker_secrets_location_1.DockerSecretsLocation();
            const result = dockerSecretsLocation.valueByName('test');
            expect(result).toBeUndefined();
        });
        it('should return undefined if ts throws an error', () => {
            ;
            fs_1.default.readFileSync.mockImplementation(() => new Error('boom'));
            const dockerSecretsLocation = new docker_secrets_location_1.DockerSecretsLocation();
            const result = dockerSecretsLocation.valueByName('test');
            expect(result).toBeUndefined();
        });
    });
});
//# sourceMappingURL=docker-secrets-location.test.js.map