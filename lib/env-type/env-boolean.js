"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvBoolean = void 0;
const base_env_storage_1 = require("./base-env-storage");
class EnvBoolean extends base_env_storage_1.BaseEnvStorage {
    constructor(envStrategy) {
        super(envStrategy);
    }
    _convertValue(envStrVal) {
        let isConvertedValue = undefined;
        if (envStrVal?.toLowerCase() === 'true') {
            isConvertedValue = true;
        }
        else if (envStrVal?.toLowerCase() === 'false') {
            isConvertedValue = false;
        }
        return isConvertedValue ?? this._defaultValue;
    }
    default(isDefaultValue) {
        this._default(isDefaultValue);
        return this;
    }
}
exports.EnvBoolean = EnvBoolean;
//# sourceMappingURL=env-boolean.js.map