"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockLoggerUtil = void 0;
const logger_util_1 = require("./logger-util");
const chai_1 = require("chai");
const sinon_1 = require("sinon");
const mockLoggerUtil = (sandbox) => ({
    _logger: { dummyLogger: 'dummyLogger' },
    setLogger: sandbox.stub(),
    getLogger: sandbox.stub(),
});
exports.mockLoggerUtil = mockLoggerUtil;
describe('util - loggerUtil', () => {
    afterEach(() => {
        logger_util_1.loggerUtil._logger = undefined;
    });
    describe('_logger', () => {
        it('should return undefined by default', () => {
            chai_1.expect(logger_util_1.loggerUtil._logger).to.be.undefined;
        });
    });
    describe('setLogger', () => {
        it('should set logger strategy in _logger', () => {
            chai_1.expect(logger_util_1.loggerUtil._logger).to.be.undefined;
            const userLogger = { dummy: 'logger' };
            logger_util_1.loggerUtil.setLogger(userLogger);
            chai_1.expect(logger_util_1.loggerUtil._logger).to.equal(userLogger);
        });
    });
    describe('getLogger', () => {
        it('should throw error if _logger undefined', () => {
            try {
                chai_1.expect(logger_util_1.loggerUtil._logger).to.be.undefined;
                logger_util_1.loggerUtil.getLogger();
                chai_1.expect.fail();
            }
            catch (err) {
                chai_1.expect(err.message).to.equal('No logger registered');
            }
        });
        it('should return _logger if it is defined', () => {
            const userLogger = { dummy: 'logger' };
            logger_util_1.loggerUtil.setLogger(userLogger);
            const result = logger_util_1.loggerUtil.getLogger();
            chai_1.expect(result).to.equal(userLogger);
        });
    });
});
describe('util - logger', () => {
    const sandbox = sinon_1.createSandbox();
    afterEach(sandbox.restore);
    it('should call getLogger function', () => {
        const userLogger = { dummy: 'logger' };
        const stub_loggerUtil_getLogger = sandbox.stub(logger_util_1.loggerUtil, 'getLogger').returns(userLogger);
        const loggerInstance = logger_util_1.logger();
        sinon_1.assert.calledOnce(stub_loggerUtil_getLogger);
        chai_1.expect(loggerInstance).to.equal(userLogger);
    });
});
//# sourceMappingURL=logger-util.test.js.map