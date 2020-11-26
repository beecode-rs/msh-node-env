"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvBoolean = void 0;
const base_env_storage_1 = require("./base-env-storage");
class EnvBoolean extends base_env_storage_1.BaseEnvStorage {
    constructor(env) {
        super(env);
    }
    _convertValue(stringOrUndefined) {
        let isConvertedValue = undefined;
        const stringValue = stringOrUndefined ?? '';
        if ((stringValue ?? '').toLowerCase() === 'true') {
            isConvertedValue = true;
        }
        else if ((stringValue ?? '').toLowerCase() === 'false') {
            isConvertedValue = false;
        }
        else {
            this._env.Logger.warn(`"${stringOrUndefined}" is not a boolean`);
        }
        return isConvertedValue ?? this._defaultValue;
    }
    default(isDefaultValue) {
        this._setDefault(isDefaultValue);
        return this;
    }
}
exports.EnvBoolean = EnvBoolean;
//# sourceMappingURL=env-boolean.js.map