"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base64_to_string_1 = require("../convert/base64-to-string");
const to_boolean_1 = require("../convert/to-boolean");
const to_json_1 = require("../convert/to-json");
const to_number_1 = require("../convert/to-number");
const to_string_1 = require("../convert/to-string");
const env_1 = require("./env");
const env_factory_1 = require("./env-factory");
const env_type_1 = require("./env-type");
describe.each([[['TEST']], [['TEST', 'TEST1']], [['TEST', 'TEST1', 'TEST2']]])('EnvFactory envNames: %p', (envNames) => {
    const envFactory = new env_factory_1.EnvFactory({ names: envNames, locationStrategies: [], namingStrategies: [] });
    describe('constructor', () => {
        it('should store env in private _env property', () => {
            expect(envFactory['_env'] instanceof env_1.Env).toBeTruthy();
        });
    });
    describe('getter', () => {
        it('should return EnvType with ToString convert strategy', () => {
            const result = envFactory.string;
            expect(result instanceof env_type_1.EnvType).toBeTruthy();
            expect(result['_convertStrategy'] instanceof to_string_1.ToString).toBeTruthy();
        });
        it('should return EnvType with ToBoolean convert strategy', () => {
            const result = envFactory.boolean;
            expect(result instanceof env_type_1.EnvType).toBeTruthy();
            expect(result['_convertStrategy'] instanceof to_boolean_1.ToBoolean).toBeTruthy();
        });
        it('should return EnvType with ToNumber convert strategy', () => {
            const result = envFactory.number;
            expect(result instanceof env_type_1.EnvType).toBeTruthy();
            expect(result['_convertStrategy'] instanceof to_number_1.ToNumber).toBeTruthy();
        });
        it('should return EnvType with Base64ToString convert strategy', () => {
            const result = envFactory.base64;
            expect(result instanceof env_type_1.EnvType).toBeTruthy();
            expect(result['_convertStrategy'] instanceof base64_to_string_1.Base64ToString).toBeTruthy();
        });
        it('should return EnvType with ToJson convert strategy', () => {
            const result = envFactory.json();
            expect(result instanceof env_type_1.EnvType).toBeTruthy();
            expect(result['_convertStrategy'] instanceof to_json_1.ToJson).toBeTruthy();
        });
    });
});
//# sourceMappingURL=env-factory.test.js.map