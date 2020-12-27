"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const convert_strategy_test_1 = require("../convert/convert-strategy.test");
const env_test_1 = require("./env.test");
const logger_strategy_test_1 = require("@beecode/msh-node-log/lib/logger-strategy.test");
const chai_1 = require("chai");
const proxyquire_1 = __importDefault(require("proxyquire"));
const sinon_1 = require("sinon");
describe('env - EnvType', () => {
    proxyquire_1.default.noCallThru();
    const sandbox = sinon_1.createSandbox();
    let mod;
    let mockLogger;
    let mckEnv;
    let mockConvert;
    const dummyDefaultValue = 'dummyDefaultValue';
    let mockEnvType;
    beforeEach(() => {
        mockLogger = new (logger_strategy_test_1.mockLoggerStrategy(sandbox))();
        mod = proxyquire_1.default('./env-type', {
            '../util': { logger: () => mockLogger },
        });
        mckEnv = new (env_test_1.mockEnv(sandbox))();
        mockConvert = new (convert_strategy_test_1.mockConvertStrategy(sandbox))();
        mockEnvType = new mod.EnvType({ convertStrategy: mockConvert, env: mckEnv });
    });
    afterEach(sandbox.restore);
    describe('constructor', () => {
        it('should pass properties', () => {
            chai_1.expect(mockEnvType['__convertStrategy']).to.equal(mockConvert);
            chai_1.expect(mockEnvType['__env']).to.equal(mckEnv);
        });
    });
    describe('default', () => {
        it('should set defaultValue', () => {
            mockEnvType['__defaultValue'] = undefined;
            const result = mockEnvType.default(dummyDefaultValue);
            chai_1.expect(result).to.equal(mockEnvType);
            chai_1.expect(mockEnvType['__defaultValue']).to.equal(dummyDefaultValue);
        });
    });
    describe('optional', () => {
        it('should return default if get env returns undefined', () => {
            mckEnv.getEnvStringValue.returns(undefined);
            mockEnvType['__defaultValue'] = dummyDefaultValue;
            const result = mockEnvType.optional;
            chai_1.expect(result).to.equal(dummyDefaultValue);
            sinon_1.assert.calledOnce(mckEnv.getEnvStringValue);
            sinon_1.assert.notCalled(mockConvert.convert);
        });
        it('should return default if convert returns undefined', () => {
            const dummyEnvValue = ' test ';
            mckEnv.getEnvStringValue.returns(' test ');
            mockConvert.convert.returns(undefined);
            mockEnvType['__defaultValue'] = dummyDefaultValue;
            const result = mockEnvType.optional;
            chai_1.expect(result).to.equal(dummyDefaultValue);
            sinon_1.assert.calledOnce(mckEnv.getEnvStringValue);
            sinon_1.assert.calledOnce(mockConvert.convert);
            sinon_1.assert.calledWith(mockConvert.convert, dummyEnvValue.trim());
        });
        it('should return converted value', () => {
            const dummyEnvValue = ' test ';
            const convertedValue = 'convertedTestValue';
            mckEnv.getEnvStringValue.returns(' test ');
            mockConvert.convert.returns(convertedValue);
            mockEnvType['__defaultValue'] = undefined;
            const result = mockEnvType.optional;
            chai_1.expect(result).to.equal(convertedValue);
            sinon_1.assert.calledOnce(mckEnv.getEnvStringValue);
            sinon_1.assert.calledOnce(mockConvert.convert);
            sinon_1.assert.calledWith(mockConvert.convert, dummyEnvValue.trim());
        });
    });
    describe('required', () => {
        let stub_envType_optional;
        beforeEach(() => {
            stub_envType_optional = sandbox.stub(mod.EnvType.prototype, 'optional');
        });
        it('should throw error if optional return undefined', () => {
            const dummyEnvName = 'DUMMY_ENV_NAME';
            const fake_env_name_get = sandbox.fake.returns(dummyEnvName);
            mckEnv.stubName.get(fake_env_name_get);
            const fake_optional_get = sandbox.fake.returns(undefined);
            stub_envType_optional.get(fake_optional_get);
            try {
                mockEnvType.required;
                chai_1.expect.fail();
            }
            catch (err) {
                chai_1.expect(err.message).to.equal(`${dummyEnvName} must have value defined`);
            }
            sinon_1.assert.calledOnce(fake_env_name_get);
            sinon_1.assert.calledOnce(fake_optional_get);
        });
        it('should return optional value if it is not undefined', () => {
            const dummyOptionalValue = 'someValue';
            const fake_optional_get = sandbox.fake.returns(dummyOptionalValue);
            stub_envType_optional.get(fake_optional_get);
            chai_1.expect(mockEnvType.required).to.equal(dummyOptionalValue);
            sinon_1.assert.calledOnce(fake_optional_get);
        });
    });
});
//# sourceMappingURL=env-type.test.js.map