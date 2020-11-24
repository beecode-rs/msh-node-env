"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvString = void 0;
const base_env_storage_1 = require("./base-env-storage");
class EnvString extends base_env_storage_1.BaseEnvStorage {
    constructor(envStrategy) {
        super(envStrategy);
    }
    _convertValue() {
        return this._envStrategy.getEnvStringValue() ?? this._defaultValue;
    }
    default(defaultValue) {
        this._default(defaultValue);
        return this;
    }
}
exports.EnvString = EnvString;
//# sourceMappingURL=env-string.js.map