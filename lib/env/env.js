"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
const util_1 = require("../util");
class Env {
    constructor(params) {
        this.__locationStrategies = params.locationStrategies;
        this.__namingStrategies = params.namingStrategies;
        this.__name = params.name;
    }
    get Name() {
        return this.__name;
    }
    __getEnvNames() {
        const result = [this.Name];
        let lastResult = [this.Name];
        for (const ns of this.__namingStrategies) {
            lastResult = ns.getNames(lastResult);
            result.push(...lastResult);
        }
        const resultNames = result.reverse();
        util_1.logger().debug(`Try names in this order: [${resultNames.join(', ')}]`);
        return resultNames;
    }
    getEnvStringValue() {
        for (const name of this.__getEnvNames()) {
            for (const ls of this.__locationStrategies) {
                const result = ls.getValueByName(name);
                if (result) {
                    util_1.logger().debug(`Found env by name: "${name}"`);
                    return result;
                }
            }
        }
        return undefined;
    }
}
exports.Env = Env;
//# sourceMappingURL=env.js.map