"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../util/logger");
const prefix_name_1 = require("./prefix-name");
const assert_1 = __importDefault(require("assert"));
jest.mock('../util/logger');
describe('PrefixName', () => {
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });
    describe('names', () => {
        it('should prefix name with "test" with default join char "_"', () => {
            const prefixName = new prefix_name_1.PrefixName('test_');
            assert_1.default.deepEqual(prefixName.names(['some-name']), ['test_some-name']);
        });
        it('should prefix name with "test" with join char "-"', () => {
            const prefixName = new prefix_name_1.PrefixName('test-');
            assert_1.default.deepEqual(prefixName.names(['some-name']), ['test-some-name']);
        });
        it('should prefix array names with "test" with default join char "_"', () => {
            const prefixName = new prefix_name_1.PrefixName('test_');
            assert_1.default.deepEqual(prefixName.names(['name-one', 'name-two']), ['test_name-one', 'test_name-two']);
        });
        it('should prefix array names with "test" with join char "-"', () => {
            const prefixName = new prefix_name_1.PrefixName('test-');
            assert_1.default.deepEqual(prefixName.names(['name-one', 'name-two']), ['test-name-one', 'test-name-two']);
        });
        it('should log messages for debugging', () => {
            const prefixName = new prefix_name_1.PrefixName('test_');
            prefixName.names(['some-name']);
            expect((0, logger_1.logger)().debug).toHaveBeenCalledTimes(1);
            expect((0, logger_1.logger)().debug).toHaveBeenCalledWith('Original names: [some-name], prefixed names : [test_some-name]');
        });
    });
});
//# sourceMappingURL=prefix-name.test.js.map