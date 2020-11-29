"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseConvert = void 0;
const env_1 = require("../env");
const _1 = require("./");
class BaseConvert {
    constructor(env) {
        this.__env = env;
    }
    get string() {
        return new env_1.EnvType({ convertStrategy: new _1.ToString(), env: this.__env });
    }
    get boolean() {
        return new env_1.EnvType({ convertStrategy: new _1.ToBoolean(), env: this.__env });
    }
    get number() {
        return new env_1.EnvType({ convertStrategy: new _1.ToNumber(), env: this.__env });
    }
    json() {
        return new env_1.EnvType({ convertStrategy: new _1.ToJson(), env: this.__env });
    }
    get base64() {
        return new env_1.EnvType({ convertStrategy: new _1.Base64ToString(), env: this.__env });
    }
}
exports.BaseConvert = BaseConvert;
//# sourceMappingURL=base-convert.js.map