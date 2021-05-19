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
const util_1 = require("util");
const jsonPrintHelper = (v) => util_1.inspect(v, false, 2);
describe('env - EnvType', () => {
    proxyquire_1.default.noCallThru();
    const sandbox = sinon_1.createSandbox();
    let mod;
    let mockLogger;
    let mckEnv;
    let mockConvert;
    const dummyDefaultValue = 'dummyDefaultValue';
    let mockEnvType;
    let deepEqualStub;
    beforeEach(() => {
        mockLogger = new (logger_strategy_test_1.mockLoggerStrategyFactory(sandbox))();
        deepEqualStub = sandbox.stub();
        mod = proxyquire_1.default('./env-type', {
            '../util': { logger: () => mockLogger },
            'deep-equal': deepEqualStub,
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
        let stub_envType_validateAllowedValues;
        beforeEach(() => {
            stub_envType_validateAllowedValues = sandbox.stub(mockEnvType, '__validateAllowedValues');
        });
        it('should return default if get env returns undefined', () => {
            mckEnv.getEnvStringValue.returns(undefined);
            mockEnvType['__defaultValue'] = dummyDefaultValue;
            const result = mockEnvType.optional;
            chai_1.expect(result).to.equal(dummyDefaultValue);
            sinon_1.assert.calledOnce(mckEnv.getEnvStringValue);
            sinon_1.assert.notCalled(mockConvert.convert);
            sinon_1.assert.calledOnce(stub_envType_validateAllowedValues);
            sinon_1.assert.calledWith(stub_envType_validateAllowedValues, result);
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
            sinon_1.assert.calledOnce(stub_envType_validateAllowedValues);
            sinon_1.assert.calledWith(stub_envType_validateAllowedValues, result);
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
            sinon_1.assert.calledOnce(stub_envType_validateAllowedValues);
            sinon_1.assert.calledWith(stub_envType_validateAllowedValues, result);
        });
    });
    describe('required', () => {
        let stub_envType_optional;
        let stub_envType_isUndefined;
        beforeEach(() => {
            stub_envType_optional = sandbox.stub(mod.EnvType.prototype, 'optional');
            stub_envType_isUndefined = sandbox.stub(mockEnvType, '__isUndefined');
            stub_envType_isUndefined.returns(false);
        });
        it('should throw error if optional return undefined', () => {
            const dummyEnvName = 'DUMMY_ENV_NAME';
            const fake_env_name_get = sandbox.fake.returns(dummyEnvName);
            mckEnv.stubName.get(fake_env_name_get);
            const fake_optional_get = sandbox.fake.returns(undefined);
            stub_envType_isUndefined.returns(true);
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
            sinon_1.assert.calledOnce(stub_envType_isUndefined);
        });
        it('should return optional value if it is not undefined', () => {
            const dummyOptionalValue = 'someValue';
            const fake_optional_get = sandbox.fake.returns(dummyOptionalValue);
            stub_envType_optional.get(fake_optional_get);
            chai_1.expect(mockEnvType.required).to.equal(dummyOptionalValue);
            sinon_1.assert.calledOnce(fake_optional_get);
            sinon_1.assert.calledOnce(stub_envType_isUndefined);
        });
    });
    describe('allowed', () => {
        it('should set allowedValues', () => {
            const dummyAllowedValues = ['test', 'test2'];
            chai_1.expect(mockEnvType['__allowedValues']).to.deep.equal([]);
            mockEnvType.allowed(...dummyAllowedValues);
            chai_1.expect(mockEnvType['__allowedValues']).to.deep.equal(dummyAllowedValues);
        });
    });
    describe('__validateAllowedValues', () => {
        let stub_envType_isUndefined;
        const dummyAllowedValues = ['test', 'test2'];
        beforeEach(() => {
            stub_envType_isUndefined = sandbox.stub(mockEnvType, '__isUndefined');
            stub_envType_isUndefined.returns(false);
        });
        it('should do nothing if allowed values is empty', () => {
            chai_1.expect(mockEnvType['__allowedValues']).to.deep.equal([]);
            mockEnvType['__validateAllowedValues']('any value');
            sinon_1.assert.notCalled(stub_envType_isUndefined);
            sinon_1.assert.notCalled(deepEqualStub);
        });
        it('should throw error if undefined is passed and we have allowed values', () => {
            mockEnvType['__allowedValues'] = dummyAllowedValues;
            try {
                stub_envType_isUndefined.returns(true);
                mockEnvType['__validateAllowedValues'](undefined);
                chai_1.expect.fail();
            }
            catch (err) {
                chai_1.expect(err.message).to.equal(` must have one of the fallowing values [${dummyAllowedValues.map(jsonPrintHelper).join(', ')}]`);
                sinon_1.assert.calledOnce(stub_envType_isUndefined);
                sinon_1.assert.notCalled(deepEqualStub);
            }
        });
        it('should throw error if value is not allowed', () => {
            mockEnvType['__allowedValues'] = dummyAllowedValues;
            try {
                mockEnvType['__validateAllowedValues']('wrongValue');
                chai_1.expect.fail();
            }
            catch (err) {
                chai_1.expect(err.message).to.equal(` must have one of the fallowing values [${dummyAllowedValues.map(jsonPrintHelper).join(', ')}]`);
                sinon_1.assert.calledOnce(stub_envType_isUndefined);
                sinon_1.assert.calledTwice(deepEqualStub);
            }
        });
        it('should not throw error', () => {
            deepEqualStub.returns(true);
            mockEnvType['__allowedValues'] = dummyAllowedValues;
            mockEnvType['__validateAllowedValues']('test');
            sinon_1.assert.calledOnce(stub_envType_isUndefined);
            sinon_1.assert.calledOnce(deepEqualStub);
        });
    });
    describe('__isUndefined', () => {
        it('should return true if value sent is undefined', () => {
            chai_1.expect(mockEnvType['__isUndefined'](undefined)).to.true;
        });
        it('should return false if value sent is not undefined', () => {
            chai_1.expect(mockEnvType['__isUndefined']('anything else')).to.false;
        });
        it('should return false if value sent is null', () => {
            chai_1.expect(mockEnvType['__isUndefined'](null)).to.false;
        });
    });
});
//# sourceMappingURL=env-type.test.js.map