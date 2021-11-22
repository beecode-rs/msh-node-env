"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Env = void 0;
class Env {
    constructor(params) {
        this.mockName = jest.fn();
        this._envNames = jest.fn();
        this.envValue = jest.fn();
        const { locationStrategies, namingStrategies, names } = params;
        this._locationStrategies = locationStrategies;
        this._namingStrategies = namingStrategies;
        this._names = names;
    }
    get Names() {
        return this.mockName();
    }
}
exports.Env = Env;
//# sourceMappingURL=env.js.map