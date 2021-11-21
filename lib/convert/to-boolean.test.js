"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const to_boolean_1 = require("./to-boolean");
describe('ToBoolean', () => {
    const toBoolean = new to_boolean_1.ToBoolean();
    it('should return undefined if passed undefined', () => {
        expect(toBoolean.convert(undefined)).toBeUndefined();
        expect(toBoolean.convert()).toBeUndefined();
    });
    ['true', 'True', 'TRUE', 'TrUe', 'tRuE'].forEach((strValue) => {
        it(`should return true if "${strValue}" passed`, () => {
            expect(toBoolean.convert(strValue)).toBeTruthy();
        });
    });
    ['false', 'False', 'FALSE', 'FaLsE', 'fAlSe'].forEach((strValue) => {
        it(`should return false if "${strValue}" passed`, () => {
            expect(toBoolean.convert(strValue)).toBeFalsy();
        });
    });
    ['not boolean', ''].forEach((someValue) => {
        it(`should return undefined if "${someValue}" passed`, () => {
            expect(toBoolean.convert(someValue)).toBeUndefined();
        });
    });
});
//# sourceMappingURL=to-boolean.test.js.map