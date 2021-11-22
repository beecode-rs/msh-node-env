"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvFactory = void 0;
const base64_to_string_1 = require("../convert/base64-to-string");
const to_boolean_1 = require("../convert/to-boolean");
const to_json_1 = require("../convert/to-json");
const to_number_1 = require("../convert/to-number");
const to_string_1 = require("../convert/to-string");
const env_1 = require("./env");
const env_type_1 = require("./env-type");
class EnvFactory {
    constructor(params) {
        const { names, locationStrategies, namingStrategies } = params;
        this._env = new env_1.Env({ names, locationStrategies, namingStrategies });
    }
    get string() {
        return new env_type_1.EnvType({ convertStrategy: new to_string_1.ToString(), env: this._env });
    }
    get boolean() {
        return new env_type_1.EnvType({ convertStrategy: new to_boolean_1.ToBoolean(), env: this._env });
    }
    get number() {
        return new env_type_1.EnvType({ convertStrategy: new to_number_1.ToNumber(), env: this._env });
    }
    json() {
        return new env_type_1.EnvType({ convertStrategy: new to_json_1.ToJson(), env: this._env });
    }
    get base64() {
        return new env_type_1.EnvType({ convertStrategy: new base64_to_string_1.Base64ToString(), env: this._env });
    }
}
exports.EnvFactory = EnvFactory;
//# sourceMappingURL=env-factory.js.map