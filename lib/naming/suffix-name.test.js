"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../util/logger");
const suffix_name_1 = require("./suffix-name");
const assert_1 = __importDefault(require("assert"));
jest.mock('../util/logger');
describe('SuffixName', () => {
    describe('names', () => {
        afterEach(() => {
            jest.resetAllMocks();
            jest.restoreAllMocks();
        });
        it('should suffix name with "test" with default join char "_"', () => {
            const suffixName = new suffix_name_1.SuffixName('_test');
            assert_1.default.deepEqual(suffixName.names(['some-name']), ['some-name_test']);
        });
        it('should suffix name with "test" with join char "-"', () => {
            const suffixName = new suffix_name_1.SuffixName('-test');
            assert_1.default.deepEqual(suffixName.names(['some-name']), ['some-name-test']);
        });
        it('should suffix array names with "test" with default join char "_"', () => {
            const suffixName = new suffix_name_1.SuffixName('_test');
            assert_1.default.deepEqual(suffixName.names(['name-one', 'name-two']), ['name-one_test', 'name-two_test']);
        });
        it('should suffix array names with "test" with join char "-"', () => {
            const suffixName = new suffix_name_1.SuffixName('-test');
            assert_1.default.deepEqual(suffixName.names(['name-one', 'name-two']), ['name-one-test', 'name-two-test']);
        });
        it('should log messages for debugging', () => {
            const suffixName = new suffix_name_1.SuffixName('_test');
            suffixName.names(['some-name']);
            expect((0, logger_1.logger)().debug).toHaveBeenCalledTimes(1);
            expect((0, logger_1.logger)().debug).toHaveBeenCalledWith('Original names: [some-name], suffixed names : [some-name_test]');
        });
    });
});
//# sourceMappingURL=suffix-name.test.js.map