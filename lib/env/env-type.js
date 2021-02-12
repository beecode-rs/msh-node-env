"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvType = void 0;
const util_1 = require("../util");
const deep_equal_1 = __importDefault(require("deep-equal"));
const util_2 = require("util");
class EnvType {
    constructor(params) {
        this.__defaultValue = undefined;
        this.__allowedValues = [];
        this.__convertStrategy = params.convertStrategy;
        this.__env = params.env;
    }
    default(defaultValue) {
        util_1.logger().debug('Using default value');
        this.__defaultValue = defaultValue;
        return this;
    }
    get optional() {
        var _a;
        const str = ((_a = this.__env.getEnvStringValue()) !== null && _a !== void 0 ? _a : '').trim();
        if (str !== '')
            util_1.logger().debug('Try to convert env string value');
        const convertedValue = str === '' ? undefined : this.__convertStrategy.convert(str);
        const optionalValue = convertedValue !== null && convertedValue !== void 0 ? convertedValue : this.__defaultValue;
        this.__validateAllowedValues(optionalValue);
        return optionalValue;
    }
    get required() {
        const envValue = this.optional;
        if (this.__isUndefined(envValue))
            throw new Error(`${this.__env.Name} must have value defined`);
        return envValue;
    }
    allowed(...args) {
        this.__allowedValues = args;
        return this;
    }
    __validateAllowedValues(value) {
        if (this.__allowedValues.length === 0)
            return;
        if (this.__isUndefined(value) || !this.__allowedValues.find((v) => deep_equal_1.default(value, v)))
            throw new Error(`${this.__env.Name} must have one of the fallowing values [${this.__allowedValues
                .map((v) => util_2.inspect(v, false, 2))
                .join(', ')}]`);
    }
    __isUndefined(value) {
        return typeof value === 'undefined';
    }
}
exports.EnvType = EnvType;
//# sourceMappingURL=env-type.js.map