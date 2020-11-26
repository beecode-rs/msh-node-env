"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
const env_any_1 = require("./env-type/env-any");
const env_base64_1 = require("./env-type/env-base64");
const env_boolean_1 = require("./env-type/env-boolean");
const env_json_1 = require("./env-type/env-json");
const env_number_1 = require("./env-type/env-number");
const env_string_1 = require("./env-type/env-string");
class Env {
    constructor(params) {
        this.__locationStrategy = params.locationStrategy;
        this.__loggerStrategy = params.loggerStrategy;
        this.__name = params.name;
    }
    get Logger() {
        return this.__loggerStrategy;
    }
    get name() {
        return this.__name;
    }
    getEnvStringValue() {
        return this.__locationStrategy.getEnvStringValue(this.__name);
    }
    get string() {
        return new env_string_1.EnvString(this);
    }
    get boolean() {
        return new env_boolean_1.EnvBoolean(this);
    }
    get number() {
        return new env_number_1.EnvNumber(this);
    }
    get json() {
        return new env_json_1.EnvJSON(this);
    }
    get any() {
        return new env_any_1.EnvAny(this);
    }
    get base64() {
        return new env_base64_1.EnvBase64(this);
    }
}
exports.Env = Env;
//# sourceMappingURL=env.js.map