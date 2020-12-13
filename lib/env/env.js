"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
class Env {
    constructor(params) {
        this.__locationStrategies = params.locationStrategies;
        this.__loggerStrategy = params.loggerStrategy;
        this.__namingStrategies = params.namingStrategies;
        this.__name = params.name;
    }
    get Name() {
        return this.__name;
    }
    get Logger() {
        return this.__loggerStrategy;
    }
    __getEnvNames() {
        const result = [this.Name];
        let lastResult = [this.Name];
        for (const ns of this.__namingStrategies) {
            lastResult = ns.getNames(lastResult);
            result.push(...lastResult);
        }
        return result.reverse();
    }
    getEnvStringValue() {
        for (const name of this.__getEnvNames()) {
            for (const ls of this.__locationStrategies) {
                const result = ls.getValueByName(name);
                if (result)
                    return result;
            }
        }
        return undefined;
    }
}
exports.Env = Env;
//# sourceMappingURL=env.js.map