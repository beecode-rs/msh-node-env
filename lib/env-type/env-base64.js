"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvBase64 = void 0;
const base_env_storage_1 = require("./base-env-storage");
const base_64_1 = require("base-64");
class EnvBase64 extends base_env_storage_1.BaseEnvStorage {
    constructor(env) {
        super(env);
    }
    _convertValue(envStrVal) {
        let convertedValue = undefined;
        if (envStrVal) {
            try {
                convertedValue = base_64_1.decode(envStrVal);
            }
            catch (err) {
                this._env.Logger.warn(`Unable to decode ${envStrVal}. Error: ${err.message || err}`);
            }
        }
        return convertedValue ?? this._defaultValue;
    }
    default(defaultValue) {
        this._setDefault(defaultValue);
        return this;
    }
}
exports.EnvBase64 = EnvBase64;
//# sourceMappingURL=env-base64.js.map