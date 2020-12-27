"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_util_test_1 = require("./util/logger-util.test");
const logger_strategy_test_1 = require("@beecode/msh-node-log/lib/logger-strategy.test");
const chai_1 = require("chai");
const proxyquire_1 = __importDefault(require("proxyquire"));
const sinon_1 = require("sinon");
describe('MshNodeEnv', () => {
    proxyquire_1.default.noCallThru();
    const sandbox = sinon_1.createSandbox();
    const dummyEnvironmentLocation = { type: 'environmentLocation' };
    const dummySimpleName = { type: 'simpleName' };
    const dummyBaseConvert = { type: 'baseConvert' };
    const dummyEnv = { type: 'env' };
    let spy_EnvironmentLocation;
    let spy_SimpleName;
    let spy_BaseConvert;
    let spy_Env;
    let mockNoLogger;
    let mckLoggerUtil;
    let mod;
    beforeEach(() => {
        mockNoLogger = logger_strategy_test_1.mockLoggerStrategy(sandbox);
        spy_EnvironmentLocation = sandbox.fake.returns(dummyEnvironmentLocation);
        spy_SimpleName = sandbox.fake.returns(dummySimpleName);
        spy_BaseConvert = sandbox.fake.returns(dummyBaseConvert);
        spy_Env = sandbox.fake.returns(dummyEnv);
        mckLoggerUtil = logger_util_test_1.mockLoggerUtil(sandbox);
        mod = proxyquire_1.default('./index', {
            '@beecode/msh-node-log': { NoLogger: mockNoLogger },
            './location': { EnvironmentLocation: spy_EnvironmentLocation },
            './naming': { SimpleName: spy_SimpleName },
            './convert': { BaseConvert: spy_BaseConvert },
            './env': { Env: spy_Env },
            './util': { loggerUtil: mckLoggerUtil },
        });
    });
    afterEach(sandbox.restore);
    it('should all default strategies', () => {
        const env = mod.default();
        sinon_1.assert.calledOnce(mockNoLogger.STUB_CONSTRUCTOR);
        sinon_1.assert.calledOnce(spy_EnvironmentLocation);
        sinon_1.assert.calledOnce(spy_SimpleName);
        sinon_1.assert.notCalled(spy_BaseConvert);
        sinon_1.assert.calledOnce(mckLoggerUtil.setLogger);
        chai_1.expect(typeof env).to.equal('function');
    });
    it('should pass all default strategy to Env on env used', () => {
        const userNoLogger = new (logger_strategy_test_1.mockLoggerStrategy(sandbox))();
        const env = mod.default({ loggerStrategy: userNoLogger });
        const name = 'TEST';
        const envResult = env(name);
        sinon_1.assert.calledOnce(spy_BaseConvert);
        sinon_1.assert.calledOnce(spy_Env);
        sinon_1.assert.calledWith(spy_Env, {
            name,
            locationStrategies: [dummyEnvironmentLocation],
            namingStrategies: [dummySimpleName],
        });
        chai_1.expect(envResult).to.equal(dummyBaseConvert);
        sinon_1.assert.calledOnce(userNoLogger.debug);
        sinon_1.assert.calledWith(userNoLogger.debug, `Initiate env: "${name}"`);
    });
    it('should not use default strategies if all are passed in constructor', () => {
        const userNoLogger = new (logger_strategy_test_1.mockLoggerStrategy(sandbox))();
        const userEnvironmentLocation = { type: 'user-environmentLocation' };
        const userSimpleName = { type: 'user-simpleName' };
        const env = mod.default({
            loggerStrategy: userNoLogger,
            locationStrategies: [userEnvironmentLocation],
            namingStrategies: [userSimpleName],
        });
        const name = 'TEST';
        env(name);
        sinon_1.assert.calledWith(spy_Env, {
            name,
            locationStrategies: [userEnvironmentLocation],
            namingStrategies: [userSimpleName],
        });
        sinon_1.assert.notCalled(mockNoLogger.STUB_CONSTRUCTOR);
        sinon_1.assert.notCalled(spy_EnvironmentLocation);
        sinon_1.assert.notCalled(spy_SimpleName);
        sinon_1.assert.calledOnce(mckLoggerUtil.setLogger);
        sinon_1.assert.calledWith(mckLoggerUtil.setLogger, userNoLogger);
    });
});
//# sourceMappingURL=index.test.js.map