"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const assert_1 = __importDefault(require("assert"));
const chai_1 = require("chai");
describe('convert - ToNumber', () => {
    describe('convert', () => {
        const toNumber = new _1.ToNumber();
        [
            ['123', 123],
            ['-123', -123],
            ['10.01', 10.01],
            ['-10.999', -10.999],
            ['0', 0],
        ].forEach(([str, expectedValue]) => {
            it(`should convert "${str}" to ${expectedValue} number`, () => {
                chai_1.expect(toNumber.convert(str)).to.equal(expectedValue);
            });
        });
        ['bb123', '1.2.3.4', '11,22', '-10.999 x', 'null', 'someWord', 'some sentence', '{"json":"value"}'].forEach((notANumber) => {
            it(`should throw error if "${notANumber}" passed`, () => {
                const checkForError = () => {
                    toNumber.convert(notANumber);
                };
                assert_1.default.throws(checkForError, Error, `"${notANumber}" is not a number`);
            });
        });
        ['', ' ', '  '].forEach((emptyString) => {
            it(`should return undefined if "${emptyString}" passed`, () => {
                chai_1.expect(toNumber.convert(emptyString)).to.be.undefined;
            });
        });
    });
});
//# sourceMappingURL=to-number.test.js.map