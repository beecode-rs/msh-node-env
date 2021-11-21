"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const to_string_1 = require("./to-string");
describe('ToString', () => {
    const toString = new to_string_1.ToString();
    it('should return undefined if passed undefined', () => {
        expect(toString.convert(undefined)).toBeUndefined();
        expect(toString.convert()).toBeUndefined();
    });
    ['string-a', 'string-b'].forEach((str) => {
        it(`should return "${str}" if "${str}" passed`, () => {
            expect(toString.convert(str)).toEqual(str);
        });
    });
    ['', ' ', '   '].forEach((str) => {
        it(`should return undefined if "${str}" passed`, () => {
            expect(toString.convert(str)).toBeUndefined();
        });
    });
});
//# sourceMappingURL=to-string.test.js.map