"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base64_to_string_1 = require("./base64-to-string");
const chai_1 = require("chai");
describe('convert - Base64ToString', () => {
    describe('convert', () => {
        const base64ToString = new base64_to_string_1.Base64ToString();
        [
            ['dGVzdA==', 'test'],
            ['c29tZSBsb25nIHRlc3Q=', 'some long test'],
            ['c29tZQpsb25nCnRlc3QKd2l0aApuZXcKcm93cw==', 'some\nlong\ntest\nwith\nnew\nrows'],
        ].forEach(([str, expectedValue]) => {
            it(`should convert base64 "${str}" to string "${expectedValue}"`, () => {
                chai_1.expect(base64ToString.convert(str)).to.equal(expectedValue);
            });
        });
        ['', ' ', '  '].forEach((emptyString) => {
            it(`should return undefined if "${emptyString}" passed`, () => {
                chai_1.expect(base64ToString.convert(emptyString)).to.be.undefined;
            });
        });
        ['-', '!', 'dGVzdA!!'].forEach((notAllowedString) => {
            it(`should throw error if "${notAllowedString}" passed`, () => {
                try {
                    base64ToString.convert(notAllowedString);
                    chai_1.expect.fail();
                }
                catch (err) {
                    chai_1.expect(err.message).to.equal(`"${notAllowedString}" is not a base64. Error: Invalid character: the string to be decoded is not correctly encoded.`);
                }
            });
        });
    });
});
//# sourceMappingURL=base64-to-string.test.js.map