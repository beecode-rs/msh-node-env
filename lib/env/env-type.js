"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvType = void 0;
class EnvType {
    constructor(params) {
        this.__defaultValue = undefined;
        this.__convertStrategy = params.convertStrategy;
        this.__env = params.env;
    }
    default(defaultValue) {
        this.__defaultValue = defaultValue;
        return this;
    }
    get optional() {
        var _a;
        const str = ((_a = this.__env.getEnvStringValue()) !== null && _a !== void 0 ? _a : '').trim();
        const convertedValue = str === '' ? undefined : this.__convertStrategy.convert(str);
        return convertedValue !== null && convertedValue !== void 0 ? convertedValue : this.__defaultValue;
    }
    get required() {
        const envValue = this.optional;
        if (typeof envValue === 'undefined')
            throw new Error(`${this.__env.Name} must have value defined`);
        return envValue;
    }
}
exports.EnvType = EnvType;
//# sourceMappingURL=env-type.js.map