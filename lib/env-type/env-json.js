"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvJSON = void 0;
const base_env_storage_1 = require("./base-env-storage");
class EnvJSON extends base_env_storage_1.BaseEnvStorage {
    constructor(env) {
        super(env);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _convertValue(stringOrUndefined) {
        let convertedValue = undefined;
        const stringValue = stringOrUndefined ?? '';
        if (stringValue.trim()) {
            try {
                convertedValue = JSON.parse(stringValue);
            }
            catch (err) {
                this._env.Logger.warn(`Error parsing JSON: ${err.message || err}`);
            }
        }
        return convertedValue ?? this._defaultValue;
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    default(defaultValue) {
        this._setDefault(defaultValue);
        return this;
    }
}
exports.EnvJSON = EnvJSON;
//# sourceMappingURL=env-json.js.map