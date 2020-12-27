"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_strategy_test_1 = require("@beecode/msh-node-log/lib/logger-strategy.test");
const chai_1 = require("chai");
const proxyquire_1 = __importDefault(require("proxyquire"));
const sinon_1 = require("sinon");
describe('naming - SuffixName', () => {
    describe('getNames', () => {
        proxyquire_1.default.noCallThru();
        const sandbox = sinon_1.createSandbox();
        let mod;
        let mockLogger;
        beforeEach(() => {
            mockLogger = new (logger_strategy_test_1.mockLoggerStrategy(sandbox))();
            mod = proxyquire_1.default('./suffix-name', {
                '../util': { logger: () => mockLogger },
            });
        });
        afterEach(sandbox.restore);
        it('should suffix name with "test" with default join char "_"', () => {
            const suffixName = new mod.SuffixName({ suffix: 'test' });
            chai_1.expect(suffixName.getNames('some-name')).to.deep.equal(['some-name_test']);
        });
        it('should suffix name with "test" with join char "-"', () => {
            const suffixName = new mod.SuffixName({ suffix: 'test', joinChar: '-' });
            chai_1.expect(suffixName.getNames('some-name')).to.deep.equal(['some-name-test']);
        });
        it('should suffix array names with "test" with default join char "_"', () => {
            const suffixName = new mod.SuffixName({ suffix: 'test' });
            chai_1.expect(suffixName.getNames(['name-one', 'name-two'])).to.deep.equal(['name-one_test', 'name-two_test']);
        });
        it('should suffix array names with "test" with join char "-"', () => {
            const suffixName = new mod.SuffixName({ suffix: 'test', joinChar: '-' });
            chai_1.expect(suffixName.getNames(['name-one', 'name-two'])).to.deep.equal(['name-one-test', 'name-two-test']);
        });
    });
});
//# sourceMappingURL=suffix-name.test.js.map