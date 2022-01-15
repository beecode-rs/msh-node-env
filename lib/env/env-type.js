"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvType = void 0;
const logger_1 = require("../util/logger");
const deep_equal_1 = __importDefault(require("deep-equal"));
class EnvType {
    constructor(params) {
        this._defaultValue = undefined;
        this._allowedValues = [];
        const { convertStrategy, env } = params;
        this._convertStrategy = convertStrategy;
        this._env = env;
    }
    default(defaultValue) {
        this._loggerDebug('set default value', { defaultValue });
        this._defaultValue = defaultValue;
        return this;
    }
    get optional() {
        this._loggerDebug(`optional`);
        const strOrUndefined = this._env.envValue();
        this._loggerDebug(`try to convert env string value "${strOrUndefined}"`);
        const convertedValue = this._convertStrategy.convert(strOrUndefined);
        if (convertedValue === undefined)
            this._loggerDebug(`using default value "${this._defaultValue}"`);
        const optionalValue = convertedValue !== null && convertedValue !== void 0 ? convertedValue : this._defaultValue;
        this._validateAllowedValues(optionalValue);
        return optionalValue;
    }
    get required() {
        this._loggerDebug(`is required`);
        const envValue = this.optional;
        if (envValue === undefined)
            throw this._createError('must have value defined');
        return envValue;
    }
    allowed(...args) {
        this._loggerDebug(`set allowed values`, { allowedValues: args });
        this._allowedValues = [...args];
        return this;
    }
    _validateAllowedValues(value) {
        if (this._allowedValues.length === 0)
            return;
        this._loggerDebug('validating allowed values for:', { value });
        if (this._allowedValuesDoNotContain(value))
            throw this._createError(`must have one of the fallowing values: ${this._allowedValuesToString()}`);
    }
    _allowedValuesDoNotContain(value) {
        const result = this._allowedValues.find((v) => (0, deep_equal_1.default)(value, v));
        if (result === undefined && value === undefined)
            return false;
        if (result === null && value === null)
            return false;
        return !result;
    }
    _allowedValuesToString() {
        return this._allowedValues.map((v) => JSON.stringify(v)).join(', ');
    }
    _loggerDebug(msg, ...args) {
        (0, logger_1.logger)().debug(`${this._EnvName} ${msg}`, ...args);
    }
    _createError(msg) {
        return new Error(`${this._EnvName} ${msg}`);
    }
    get _EnvName() {
        return `Env[${this._env.Names.join(',')}]`;
    }
}
exports.EnvType = EnvType;
//# sourceMappingURL=env-type.js.map