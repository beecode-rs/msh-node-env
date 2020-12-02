"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
class Env {
    constructor(params) {
        this.__locationStrategy = params.locationStrategy;
        this.__loggerStrategy = params.loggerStrategy;
        this.__name = params.name;
    }
    get Name() {
        return this.__name;
    }
    get Logger() {
        return this.__loggerStrategy;
    }
    getEnvStringValue() {
        return this.__locationStrategy.getEnvStringValue(this.Name);
    }
}
exports.Env = Env;
//# sourceMappingURL=env.js.map