"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const chai_1 = require("chai");
describe('convert - ToJson', () => {
    describe('convert', () => {
        const toJson = new _1.ToJson();
        it('should return object parsed from string', () => {
            const jsonObject = { test: 'some test value' };
            const result = toJson.convert(JSON.stringify(jsonObject));
            chai_1.expect(result).not.to.equal(jsonObject);
            chai_1.expect(result).to.deep.equal(jsonObject);
        });
        ['', ' ', '   '].forEach((str) => {
            it(`should return undefined if "${str}" passed`, () => {
                chai_1.expect(toJson.convert(str)).to.be.undefined;
            });
        });
        it('should throw error if unable to convert to json', () => {
            try {
                toJson.convert('not a string');
                chai_1.expect.fail();
            }
            catch (e) {
                chai_1.expect(e.message).to.equal('"not a string" is not a json. Error: Unexpected token o in JSON at position 1');
            }
        });
    });
});
//# sourceMappingURL=to-json.test.js.map