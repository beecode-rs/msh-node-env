"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_strategy_test_1 = require("@beecode/msh-node-log/lib/logger-strategy.test");
const chai_1 = require("chai");
const proxyquire_1 = __importDefault(require("proxyquire"));
const sinon_1 = require("sinon");
describe('naming - PrefixName', () => {
    proxyquire_1.default.noCallThru();
    const sandbox = sinon_1.createSandbox();
    let mod;
    let mockLogger;
    beforeEach(() => {
        mockLogger = new (logger_strategy_test_1.mockLoggerStrategyFactory(sandbox))();
        mod = proxyquire_1.default('./prefix-name', {
            '../util': { logger: () => mockLogger },
        });
    });
    afterEach(sandbox.restore);
    describe('getNames', () => {
        it('should prefix name with "test" with default join char "_"', () => {
            const prefixName = new mod.PrefixName({ prefix: 'test' });
            chai_1.expect(prefixName.getNames('some-name')).to.deep.equal(['test_some-name']);
        });
        it('should prefix name with "test" with join char "-"', () => {
            const prefixName = new mod.PrefixName({ prefix: 'test', joinChar: '-' });
            chai_1.expect(prefixName.getNames('some-name')).to.deep.equal(['test-some-name']);
        });
        it('should prefix array names with "test" with default join char "_"', () => {
            const prefixName = new mod.PrefixName({ prefix: 'test' });
            chai_1.expect(prefixName.getNames(['name-one', 'name-two'])).to.deep.equal(['test_name-one', 'test_name-two']);
        });
        it('should prefix array names with "test" with join char "-"', () => {
            const prefixName = new mod.PrefixName({ prefix: 'test', joinChar: '-' });
            chai_1.expect(prefixName.getNames(['name-one', 'name-two'])).to.deep.equal(['test-name-one', 'test-name-two']);
        });
    });
});
//# sourceMappingURL=prefix-name.test.js.map