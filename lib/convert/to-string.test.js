"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const chai_1 = require("chai");
describe('convert - ToString', () => {
    describe('convert', () => {
        const toString = new _1.ToString();
        ['string-a', 'string-b'].forEach((str) => {
            it(`should return "${str}" if "${str}" passed`, () => {
                chai_1.expect(toString.convert(str)).to.equal(str);
            });
        });
        ['', ' ', '   '].forEach((str) => {
            it(`should return undefined if "${str}" passed`, () => {
                chai_1.expect(toString.convert(str)).to.be.undefined;
            });
        });
    });
});
//# sourceMappingURL=to-string.test.js.map