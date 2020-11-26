"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvNumber = void 0;
const base_env_storage_1 = require("./base-env-storage");
class EnvNumber extends base_env_storage_1.BaseEnvStorage {
    constructor(env) {
        super(env);
    }
    _convertValue(stringOrUndefined) {
        let convertedValue = undefined;
        const stringValue = stringOrUndefined ?? '';
        if (stringValue.trim() !== '' && !isNaN(stringValue)) {
            convertedValue = parseFloat(stringValue);
        }
        else {
            this._env.Logger.warn(`"${stringOrUndefined}" is not a number`);
        }
        return convertedValue ?? this._defaultValue;
    }
    default(defaultValue) {
        this._setDefault(defaultValue);
        return this;
    }
}
exports.EnvNumber = EnvNumber;
//# sourceMappingURL=env-number.js.map