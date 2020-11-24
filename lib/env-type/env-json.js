"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvJSON = void 0;
const base_env_storage_1 = require("./base-env-storage");
class EnvJSON extends base_env_storage_1.BaseEnvStorage {
    constructor(envStrategy) {
        super(envStrategy);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _convertValue(envStrVal) {
        let convertedValue = undefined;
        try {
            convertedValue = JSON.parse(envStrVal);
        }
        catch (err) {
            // eslint-disable-next-line no-console
            console.error(err.message || err);
        }
        return convertedValue ?? this._defaultValue;
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    default(defaultValue) {
        this._default(defaultValue);
        return this;
    }
}
exports.EnvJSON = EnvJSON;
//# sourceMappingURL=env-json.js.map