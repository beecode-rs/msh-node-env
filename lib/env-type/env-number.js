"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvNumber = void 0;
const base_env_storage_1 = require("./base-env-storage");
class EnvNumber extends base_env_storage_1.BaseEnvStorage {
    constructor(envStrategy) {
        super(envStrategy);
    }
    _convertValue(envStrVal) {
        let convertedValue = undefined;
        if (!isNaN(envStrVal)) {
            convertedValue = parseFloat(envStrVal);
        }
        return convertedValue ?? this._defaultValue;
    }
    default(defaultValue) {
        this._default(defaultValue);
        return this;
    }
}
exports.EnvNumber = EnvNumber;
//# sourceMappingURL=env-number.js.map