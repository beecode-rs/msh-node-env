"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvBase64 = void 0;
const base_env_storage_1 = require("./base-env-storage");
const base_64_1 = require("base-64");
class EnvBase64 extends base_env_storage_1.BaseEnvStorage {
    constructor(envStrategy) {
        super(envStrategy);
    }
    _convertValue(envStrVal) {
        let convertedValue = undefined;
        try {
            if (envStrVal) {
                convertedValue = base_64_1.decode(envStrVal);
            }
        }
        catch (err) {
            // eslint-disable-next-line no-console
            console.error(err.message || err);
        }
        return convertedValue ?? this._defaultValue;
    }
    default(defaultValue) {
        this._default(defaultValue);
        return this;
    }
}
exports.EnvBase64 = EnvBase64;
//# sourceMappingURL=env-base64.js.map