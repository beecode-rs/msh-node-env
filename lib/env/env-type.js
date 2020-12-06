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
        const str = (this.__env.getEnvStringValue() ?? '').trim();
        const convertedValue = str === '' ? undefined : this.__convertStrategy.convert(str);
        return convertedValue ?? this.__defaultValue;
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