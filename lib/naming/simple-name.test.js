"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simple_name_1 = require("./simple-name");
const assert_1 = __importDefault(require("assert"));
describe('SimpleName', () => {
    describe('names', () => {
        it('should return array of name', () => {
            const simpleName = new simple_name_1.SimpleName();
            assert_1.default.deepEqual(simpleName.names(['some-name']), ['some-name']);
        });
        it('should return array of names', () => {
            const simpleName = new simple_name_1.SimpleName();
            assert_1.default.deepEqual(simpleName.names(['some-name']), ['some-name']);
        });
        it('should return array of multiple names', () => {
            const simpleName = new simple_name_1.SimpleName();
            assert_1.default.deepEqual(simpleName.names(['some-name', 'some-name2']), ['some-name', 'some-name2']);
        });
    });
});
//# sourceMappingURL=simple-name.test.js.map