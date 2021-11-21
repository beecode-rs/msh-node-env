"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_util_1 = require("./string-util");
describe('util - stringUtil', () => {
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });
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
                const result = string_util_1.stringUtil.toSnakeCase(value);
                expect(result).toEqual(expected);
            });
        });
    });
    describe('toSnakeUpperCase', () => {
        let spy_stringUtil_toSnakeCase;
        beforeEach(() => {
            spy_stringUtil_toSnakeCase = jest.spyOn(string_util_1.stringUtil, 'toSnakeCase');
        });
        it('should return snake and make it upper case', () => {
            const dummySnakeCase = 'snake_case';
            spy_stringUtil_toSnakeCase.mockReturnValue(dummySnakeCase);
            expect(string_util_1.stringUtil.toSnakeUpperCase('snakeCase')).toEqual('SNAKE_CASE');
        });
    });
});
//# sourceMappingURL=string-util.test.js.map