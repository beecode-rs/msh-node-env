"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mock_location_strategy_1 = require("../location/__mocks__/mock-location-strategy");
const mock_naming_strategy_1 = require("../naming/__mocks__/mock-naming-strategy");
const env_1 = require("./env");
const assert_1 = __importDefault(require("assert"));
describe('Env', () => {
    let dummyEnv;
    let mockLocationStrategy;
    let mockNamingStrategy;
    const dummyEnvName = 'DUMMY_TEST_ENV';
    beforeEach(() => {
        mockNamingStrategy = new mock_naming_strategy_1.MockNamingStrategy();
        mockLocationStrategy = new mock_location_strategy_1.MockLocationStrategy();
        dummyEnv = new env_1.Env({ name: dummyEnvName, locationStrategies: [mockLocationStrategy], namingStrategies: [mockNamingStrategy] });
    });
    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });
    describe('constructor', () => {
        it('should setup properties', () => {
            expect(dummyEnv['_name']).toEqual(dummyEnvName);
            assert_1.default.deepEqual(dummyEnv['_locationStrategies'], [mockLocationStrategy]);
            assert_1.default.deepEqual(dummyEnv['_namingStrategies'], [mockNamingStrategy]);
        });
    });
    describe('Name', () => {
        it('should return _name when Name called', () => {
            expect(dummyEnv.Name).toEqual(dummyEnvName);
        });
    });
    describe('_envNames', () => {
        it('should call names of naming strategy', () => {
            mockNamingStrategy.names.mockReturnValue(['test1']);
            const result = dummyEnv['_envNames']();
            expect(mockNamingStrategy.names).toHaveBeenCalledTimes(1);
            expect(mockNamingStrategy.names).toHaveBeenCalledWith([dummyEnvName]);
            assert_1.default.deepEqual(result, ['test1', dummyEnvName]);
        });
        it('should simulate double prefixing', () => {
            const fakePrefixFactory = (prefix) => (name) => {
                const names = typeof name === 'string' ? [name] : name;
                return [...names.map((n) => [prefix, n].join('_'))];
            };
            const mockNamingStrategy1 = new mock_naming_strategy_1.MockNamingStrategy();
            mockNamingStrategy1.names.mockImplementation(fakePrefixFactory('FIRST'));
            const mockNamingStrategy2 = new mock_naming_strategy_1.MockNamingStrategy();
            mockNamingStrategy2.names.mockImplementation(fakePrefixFactory('SECOND'));
            const env = new env_1.Env({
                name: dummyEnvName,
                locationStrategies: [mockLocationStrategy],
                namingStrategies: [mockNamingStrategy1, mockNamingStrategy2],
            });
            const result = env['_envNames']();
            expect(mockNamingStrategy1.names).toHaveBeenCalledTimes(1);
            expect(mockNamingStrategy1.names).toHaveBeenCalledWith([dummyEnvName]);
            expect(mockNamingStrategy2.names).toHaveBeenCalledTimes(1);
            expect(mockNamingStrategy2.names).toHaveBeenCalledWith([`FIRST_${dummyEnvName}`]);
            expect(mockNamingStrategy1.names).toHaveBeenCalledBefore(mockNamingStrategy2.names);
            assert_1.default.deepEqual(result, [`SECOND_FIRST_${dummyEnvName}`, `FIRST_${dummyEnvName}`, dummyEnvName]);
        });
    });
    describe('envValue', () => {
        let spy_envNames;
        beforeEach(() => {
            spy_envNames = jest.spyOn(dummyEnv, '_envNames');
        });
        it('should call location strategy envStringValue', () => {
            const getValueReturn = 'envValue';
            const namesReturn = ['name'];
            spy_envNames.mockReturnValue(namesReturn);
            mockLocationStrategy.valueByName.mockReturnValue(getValueReturn);
            const result = dummyEnv.envValue();
            expect(mockLocationStrategy.valueByName).toHaveBeenCalledTimes(1);
            expect(mockLocationStrategy.valueByName).toHaveBeenCalledWith(namesReturn[0]);
            expect(result).toEqual(getValueReturn);
        });
        it('should return undefined if no env found', () => {
            const namesReturn = ['name'];
            spy_envNames.mockReturnValue(namesReturn);
            const result = dummyEnv.envValue();
            expect(mockLocationStrategy.valueByName).toHaveBeenCalledTimes(1);
            expect(mockLocationStrategy.valueByName).toHaveBeenCalledWith(namesReturn[0]);
            expect(result).toBeUndefined();
        });
    });
});
//# sourceMappingURL=env.test.js.map