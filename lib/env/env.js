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
        return this.__namingStrategies
            .reverse()
            .reduce((acc, ns) => {
            return ns.getNames(acc.length > 0 ? acc : this.Name);
        }, []);
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