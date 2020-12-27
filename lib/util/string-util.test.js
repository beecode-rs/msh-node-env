"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const chai_1 = require("chai");
const sinon_1 = require("sinon");
describe('util - stringUtil', () => {
    const sandbox = sinon_1.createSandbox();
    describe('toSnakeCase', () => {
        it('should convert any case to snake case', () => {
            ;
            [
                ['', ''],
                [' ', ''],
                ['  ', ''],
                ['TEST', 'test'],
                ['this is  a test', 'this_is_a_test'],
                ['this-is-_a|test', 'this_is_a_test'],
                ['PascalCase', 'pascal_case'],
                ['camelCase', 'camel_case'],
                ['snake_case', 'snake_case'],
            ].forEach(([value, expected]) => {
                const result = _1.stringUtil.toSnakeCase(value);
                chai_1.expect(result).to.equal(expected);
            });
        });
    });
    describe('toSnakeUpperCase', () => {
        let stub_stringUtil_toSnakeCase;
        beforeEach(() => {
            stub_stringUtil_toSnakeCase = sandbox.stub(_1.stringUtil, 'toSnakeCase');
        });
        afterEach(sandbox.restore);
        it('should return snake and make it upper case', () => {
            const dummySnakeCase = 'snake_case';
            stub_stringUtil_toSnakeCase.returns(dummySnakeCase);
            chai_1.expect(_1.stringUtil.toSnakeUpperCase('snakeCase')).to.equal('SNAKE_CASE');
        });
    });
});
//# sourceMappingURL=string-util.test.js.map