"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEnvStorage = void 0;
class BaseEnvStorage {
    constructor(envStrategy) {
        this._defaultValue = undefined;
        this._envStrategy = envStrategy;
    }
    _default(defaultValue) {
        this._defaultValue = defaultValue;
    }
    // TODO implement allowed values validation
    // protected _allowedValues(...args: T[]): void {
    //   throw new Error('not implemented')
    // }
    requiredValue() {
        const envValue = this.value();
        if (typeof envValue === 'undefined') {
            throw new Error(`${this._envStrategy.getEnvName()} must have value defined`);
        }
        return envValue;
    }
    value() {
        return this._convertValue(this._envStrategy.getEnvStringValue());
    }
}
exports.BaseEnvStorage = BaseEnvStorage;
//# sourceMappingURL=base-env-storage.js.map