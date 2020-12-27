"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const chai_1 = require("chai");
describe('convert - ToBoolean', () => {
    describe('convert', () => {
        const toBoolean = new _1.ToBoolean();
        ['true', 'True', 'TRUE', 'TrUe', 'tRuE'].forEach((strValue) => {
            it(`should return true if "${strValue}" passed`, () => {
                chai_1.expect(toBoolean.convert(strValue)).to.be.true;
            });
        });
        ['false', 'False', 'FALSE', 'FaLsE', 'fAlSe'].forEach((strValue) => {
            it(`should return false if "${strValue}" passed`, () => {
                chai_1.expect(toBoolean.convert(strValue)).to.be.false;
            });
        });
        ['not boolean', ''].forEach((someValue) => {
            it(`should return undefined if "${someValue}" passed`, () => {
                chai_1.expect(toBoolean.convert(someValue)).to.be.undefined;
            });
        });
    });
});
//# sourceMappingURL=to-boolean.test.js.map