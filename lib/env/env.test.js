"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockEnv = void 0;
const location_strategy_test_1 = require("../location/location-strategy.test");
const naming_strategy_test_1 = require("../naming/naming-strategy.test");
const logger_strategy_test_1 = require("@beecode/msh-node-log/lib/logger-strategy.test");
const chai_1 = require("chai");
const proxyquire_1 = __importDefault(require("proxyquire"));
const sinon_1 = require("sinon");
const mockEnv = (sandbox) => {
    const stub_constructor = sandbox.stub();
    return class {
        constructor(...args) {
            this.STUB_CONSTRUCTOR = stub_constructor;
            this.Name = '';
            this.stubName = sandbox.stub(this, 'Name');
            this.getEnvStringValue = sandbox.stub();
            stub_constructor(...args);
        }
    };
};
exports.mockEnv = mockEnv;
describe('env - Env', () => {
    proxyquire_1.default.noCallThru();
    const sandbox = sinon_1.createSandbox();
    let mod;
    const dummyEnvName = 'DUMMY_ENV';
    let mockLocation;
    let mockNaming;
    let mockEnv;
    let mockLogger;
    beforeEach(() => {
        mockLogger = new (logger_strategy_test_1.mockLoggerStrategyFactory(sandbox))();
        mockLocation = new (location_strategy_test_1.mockLocationStrategy(sandbox))();
        mockNaming = new (naming_strategy_test_1.mockNamingStrategy(sandbox))();
        mod = proxyquire_1.default('./env', {
            '../util': { logger: () => mockLogger },
        });
        mockEnv = new mod.Env({
            name: dummyEnvName,
            locationStrategies: [mockLocation],
            namingStrategies: [mockNaming],
        });
    });
    afterEach(sandbox.restore);
    describe('constructor', () => {
        it('should setup properties', () => {
            chai_1.expect(mockEnv['__name']).to.equal(dummyEnvName);
            chai_1.expect(mockEnv['__locationStrategies']).to.deep.equal([mockLocation]);
            chai_1.expect(mockEnv['__namingStrategies']).to.deep.equal([mockNaming]);
        });
    });
    describe('Name', () => {
        it('should return __name when Name called', () => {
            chai_1.expect(mockEnv.Name).to.equal(dummyEnvName);
        });
    });
    describe('__getEnvNames', () => {
        it('should call getNames of naming strategy', () => {
            mockNaming.getNames.returns(['test1']);
            const env = new mod.Env({
                name: dummyEnvName,
                locationStrategies: [mockLocation],
                namingStrategies: [mockNaming],
            });
            const result = env['__getEnvNames']();
            sinon_1.assert.calledOnce(mockNaming.getNames);
            sinon_1.assert.calledWith(mockNaming.getNames, [dummyEnvName]);
            chai_1.expect(result).to.deep.equal(['test1', dummyEnvName]);
        });
        it('should simulate double prefixing', () => {
            const fakePrefixFactory = (prefix) => (name) => {
                const names = typeof name === 'string' ? [name] : name;
                return [...names.map((n) => [prefix, n].join('_'))];
            };
            const mockNaming1 = new (naming_strategy_test_1.mockNamingStrategy(sandbox))();
            mockNaming1.getNames.callsFake(fakePrefixFactory('FIRST'));
            const mockNaming2 = new (naming_strategy_test_1.mockNamingStrategy(sandbox))();
            mockNaming2.getNames.callsFake(fakePrefixFactory('SECOND'));
            const env = new mod.Env({
                name: dummyEnvName,
                locationStrategies: [mockLocation],
                namingStrategies: [mockNaming1, mockNaming2],
            });
            const result = env['__getEnvNames']();
            sinon_1.assert.calledOnce(mockNaming1.getNames);
            sinon_1.assert.calledWith(mockNaming1.getNames, [dummyEnvName]);
            sinon_1.assert.calledOnce(mockNaming2.getNames);
            sinon_1.assert.calledWith(mockNaming2.getNames, [`FIRST_${dummyEnvName}`]);
            sinon_1.assert.callOrder(mockNaming1.getNames, mockNaming2.getNames);
            chai_1.expect(result).to.deep.equal([`SECOND_FIRST_${dummyEnvName}`, `FIRST_${dummyEnvName}`, dummyEnvName]);
        });
    });
    describe('getEnvStringValue', () => {
        let stub_env_getEnvNames;
        beforeEach(() => {
            stub_env_getEnvNames = sandbox.stub(mockEnv, '__getEnvNames');
        });
        it('should call location strategy getEnvStringValue', () => {
            const getValueReturn = 'envValue';
            const getNamesReturn = ['name'];
            stub_env_getEnvNames.returns(getNamesReturn);
            mockLocation.getValueByName.returns(getValueReturn);
            const result = mockEnv.getEnvStringValue();
            sinon_1.assert.calledOnce(mockLocation.getValueByName);
            sinon_1.assert.calledWith(mockLocation.getValueByName, getNamesReturn[0]);
            chai_1.expect(result).to.equal(getValueReturn);
        });
        it('should return undefined if no env found', () => {
            const getNamesReturn = ['name'];
            stub_env_getEnvNames.returns(getNamesReturn);
            const result = mockEnv.getEnvStringValue();
            sinon_1.assert.calledOnce(mockLocation.getValueByName);
            sinon_1.assert.calledWith(mockLocation.getValueByName, getNamesReturn[0]);
            chai_1.expect(result).to.be.undefined;
        });
    });
});
//# sourceMappingURL=env.test.js.map