"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
const logger_1 = require("../util/logger");
class Env {
    constructor(params) {
        const { locationStrategies, namingStrategies, name } = params;
        this._locationStrategies = locationStrategies;
        this._namingStrategies = namingStrategies;
        this._name = name;
    }
    get Name() {
        return this._name;
    }
    _envNames() {
        const { result } = this._namingStrategies.reduce((acc, ns) => {
            acc.lastResult = ns.names(acc.lastResult);
            acc.result.push(...acc.lastResult);
            return acc;
        }, { result: [this.Name], lastResult: [this.Name] });
        const resultNames = result.reverse();
        (0, logger_1.logger)().debug(`Try names in this order: [${resultNames.join(', ')}]`);
        return resultNames;
    }
    envValue() {
        return this._envNames().reduce((envResult, name) => {
            if (envResult)
                return envResult;
            return this._locationStrategies.reduce((locResult, ls) => {
                if (locResult)
                    return locResult;
                return ls.valueByName(name);
            }, undefined);
        }, undefined);
    }
}
exports.Env = Env;
//# sourceMappingURL=env.js.map