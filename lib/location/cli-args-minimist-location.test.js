"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_args_minimist_location_1 = require("./cli-args-minimist-location");
describe('CliArgsMinimistLocation', () => {
    it.each([
        [{ args: ['test'] }, { _args: { _: ['test'] } }, {}],
        [{ args: ['test', 'test2'] }, { _args: { _: ['test', 'test2'] } }, {}],
        [{ args: ['--test'] }, { _args: { _: [], test: true } }, {}],
        [{ args: ['-t'] }, { _args: { _: [], t: true } }, {}],
        [
            { options: { test: { type: 'boolean', alias: 't' } }, args: ['-t'] },
            { _args: { _: [], t: true, test: true } },
            { test: 'true' },
        ],
        [
            { options: { test: { type: 'boolean', alias: 't' } }, args: ['--test'] },
            { _args: { _: [], t: true, test: true } },
            { test: 'true' },
        ],
        [
            { options: { test: { type: 'string', alias: 't' } }, args: ['--test=someValue'] },
            { _args: { _: [], t: 'someValue', test: 'someValue' } },
            { test: 'someValue' },
        ],
        [
            { options: { test: { type: 'number', alias: 't' } }, args: ['--test=123'] },
            { _args: { _: [], t: 123, test: 123 } },
            { test: '123' },
        ],
    ])('should pass expect result from srd: %j', (srcParams, result, names) => {
        const cliArgLoc = new cli_args_minimist_location_1.CliArgsMinimistLocation(srcParams);
        Object.entries(result).forEach(([key, value]) => {
            expect(cliArgLoc[key]).toEqual(value);
        });
        Object.entries(names).forEach(([key, value]) => {
            expect(cliArgLoc.valueByName(key)).toEqual(value);
        });
    });
});
//# sourceMappingURL=cli-args-minimist-location.test.js.map