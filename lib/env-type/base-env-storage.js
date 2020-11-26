"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEnvStorage = void 0;
class BaseEnvStorage {
    constructor(env) {
        this._defaultValue = undefined;
        this._env = env;
    }
    _setDefault(defaultValue) {
        this._defaultValue = defaultValue;
    }
    // TODO implement allowed values validation
    // protected _allowedValues(...args: T[]): void {
    //   throw new Error('not implemented')
    // }
    get required() {
        const envValue = this.optional;
        if (typeof envValue === 'undefined') {
            throw new Error(`${this._env.name} must have value defined`);
        }
        return envValue;
    }
    get optional() {
        return this._convertValue(this._env.getEnvStringValue());
    }
}
exports.BaseEnvStorage = BaseEnvStorage;
//# sourceMappingURL=base-env-storage.js.map