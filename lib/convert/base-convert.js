"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseConvert = void 0;
const env_type_1 = require("../env/env-type");
const base64_to_string_1 = require("./base64-to-string");
const to_boolean_1 = require("./to-boolean");
const to_json_1 = require("./to-json");
const to_number_1 = require("./to-number");
const to_string_1 = require("./to-string");
class BaseConvert {
    constructor(env) {
        this.__env = env;
    }
    get string() {
        return new env_type_1.EnvType({ convertStrategy: new to_string_1.ToString(), env: this.__env });
    }
    get boolean() {
        return new env_type_1.EnvType({ convertStrategy: new to_boolean_1.ToBoolean(), env: this.__env });
    }
    get number() {
        return new env_type_1.EnvType({ convertStrategy: new to_number_1.ToNumber(), env: this.__env });
    }
    json() {
        return new env_type_1.EnvType({ convertStrategy: new to_json_1.ToJson(), env: this.__env });
    }
    get base64() {
        return new env_type_1.EnvType({ convertStrategy: new base64_to_string_1.Base64ToString(), env: this.__env });
    }
}
exports.BaseConvert = BaseConvert;
//# sourceMappingURL=base-convert.js.map