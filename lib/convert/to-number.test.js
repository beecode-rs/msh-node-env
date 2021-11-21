"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const to_number_1 = require("./to-number");
const assert_1 = __importDefault(require("assert"));
describe('ToNumber', () => {
    const toNumber = new to_number_1.ToNumber();
    it('should return undefined if passed undefined', () => {
        expect(toNumber.convert(undefined)).toBeUndefined();
        expect(toNumber.convert()).toBeUndefined();
    });
    [
        ['123', 123],
        ['-123', -123],
        ['10.01', 10.01],
        ['-10.999', -10.999],
        ['0', 0],
    ].forEach(([str, expectedValue]) => {
        it(`should convert "${str}" to ${expectedValue} number`, () => {
            expect(toNumber.convert(str)).toEqual(expectedValue);
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
            expect(toNumber.convert(emptyString)).toBeUndefined();
        });
    });
});
//# sourceMappingURL=to-number.test.js.map