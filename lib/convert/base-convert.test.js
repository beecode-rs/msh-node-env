"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const env_1 = require("../env");
const chai_1 = require("chai");
describe('convert - BaseConvert', () => {
    const dummyEnv = {};
    const baseConvert = new _1.BaseConvert(dummyEnv);
    describe('constructor', () => {
        it('should store env in private __env property', () => {
            chai_1.expect(baseConvert['__env']).to.equal(dummyEnv);
        });
    });
    describe('getter', () => {
        it('should return EnvType with ToString convert strategy', () => {
            const result = baseConvert.string;
            chai_1.expect(result).to.be.an.instanceof(env_1.EnvType);
            chai_1.expect(result['__convertStrategy']).to.be.an.instanceof(_1.ToString);
        });
        it('should return EnvType with ToBoolean convert strategy', () => {
            const result = baseConvert.boolean;
            chai_1.expect(result).to.be.an.instanceof(env_1.EnvType);
            chai_1.expect(result['__convertStrategy']).to.be.an.instanceof(_1.ToBoolean);
        });
        it('should return EnvType with ToNumber convert strategy', () => {
            const result = baseConvert.number;
            chai_1.expect(result).to.be.an.instanceof(env_1.EnvType);
            chai_1.expect(result['__convertStrategy']).to.be.an.instanceof(_1.ToNumber);
        });
        it('should return EnvType with Base64ToString convert strategy', () => {
            const result = baseConvert.base64;
            chai_1.expect(result).to.be.an.instanceof(env_1.EnvType);
            chai_1.expect(result['__convertStrategy']).to.be.an.instanceof(_1.Base64ToString);
        });
        it('should return EnvType with ToJson convert strategy', () => {
            const result = baseConvert.json();
            chai_1.expect(result).to.be.an.instanceof(env_1.EnvType);
            chai_1.expect(result['__convertStrategy']).to.be.an.instanceof(_1.ToJson);
        });
    });
});
//# sourceMappingURL=base-convert.test.js.map