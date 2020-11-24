"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
const env_base64_1 = require("./env-type/env-base64");
const env_boolean_1 = require("./env-type/env-boolean");
const env_json_1 = require("./env-type/env-json");
const env_number_1 = require("./env-type/env-number");
const env_string_1 = require("./env-type/env-string");
class Env {
    constructor(envStrategy) {
        this.__envStrategy = envStrategy;
    }
    get String() {
        return new env_string_1.EnvString(this.__envStrategy);
    }
    get Boolean() {
        return new env_boolean_1.EnvBoolean(this.__envStrategy);
    }
    get Number() {
        return new env_number_1.EnvNumber(this.__envStrategy);
    }
    get Json() {
        return new env_json_1.EnvJSON(this.__envStrategy);
    }
    get Base64() {
        return new env_base64_1.EnvBase64(this.__envStrategy);
    }
}
exports.Env = Env;
//# sourceMappingURL=env.js.map