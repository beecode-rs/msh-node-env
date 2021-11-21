"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const to_json_1 = require("./to-json");
describe('ToJson', () => {
    const toJson = new to_json_1.ToJson();
    it('should return undefined if passed undefined', () => {
        expect(toJson.convert(undefined)).toBeUndefined();
        expect(toJson.convert()).toBeUndefined();
    });
    it('should return object parsed from string', () => {
        const jsonObject = { test: 'some test value' };
        const result = toJson.convert(JSON.stringify(jsonObject));
        expect(result).not.toBe(jsonObject);
        expect(result).toEqual(jsonObject);
    });
    ['', ' ', '   '].forEach((str) => {
        it(`should return undefined if "${str}" passed`, () => {
            expect(toJson.convert(str)).toBeUndefined();
        });
    });
    it('should throw error if unable to convert to json', () => {
        try {
            toJson.convert('not a string');
            throw new Error('test failed');
        }
        catch (e) {
            expect(e.message).toEqual('"not a string" is not a json. Error: Unexpected token o in JSON at position 1');
        }
    });
});
//# sourceMappingURL=to-json.test.js.map