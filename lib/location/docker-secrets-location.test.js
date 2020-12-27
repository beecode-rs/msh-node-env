"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const chai_1 = require("chai");
const fs_1 = __importDefault(require("fs"));
const sinon_1 = require("sinon");
const util_1 = __importDefault(require("util"));
describe('location - DockerSecretsLocation', () => {
    describe('getValueByName', () => {
        const sandbox = sinon_1.createSandbox();
        let stub_fs_readFileSync;
        let stub_util_format;
        beforeEach(() => {
            stub_fs_readFileSync = sandbox.stub(fs_1.default, 'readFileSync');
            stub_util_format = sandbox.stub(util_1.default, 'format');
        });
        afterEach(sandbox.restore);
        it('should call fs and util', () => {
            const fsResult = 'fs-result';
            const utilResult = 'util-result';
            const envName = 'test';
            stub_fs_readFileSync.returns(fsResult);
            stub_util_format.returns(utilResult);
            const dockerSecretsLocation = new _1.DockerSecretsLocation();
            const result = dockerSecretsLocation.getValueByName(envName);
            sinon_1.assert.calledOnce(stub_util_format);
            sinon_1.assert.calledWith(stub_util_format, '/run/secrets/%s', envName);
            sinon_1.assert.calledOnce(stub_fs_readFileSync);
            sinon_1.assert.calledWith(stub_fs_readFileSync, utilResult);
            chai_1.expect(result).to.equal(fsResult);
        });
        it('should return undefined if util throws an error', () => {
            stub_util_format.throws(new Error('boom'));
            const dockerSecretsLocation = new _1.DockerSecretsLocation();
            const result = dockerSecretsLocation.getValueByName('test');
            chai_1.expect(result).to.be.undefined;
        });
        it('should return undefined if ts throws an error', () => {
            stub_fs_readFileSync.throws(new Error('boom'));
            const dockerSecretsLocation = new _1.DockerSecretsLocation();
            const result = dockerSecretsLocation.getValueByName('test');
            chai_1.expect(result).to.be.undefined;
        });
    });
});
//# sourceMappingURL=docker-secrets-location.test.js.map