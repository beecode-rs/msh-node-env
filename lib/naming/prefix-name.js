"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixName = void 0;
const logger_1 = require("../util/logger");
class PrefixName {
    constructor(prefix) {
        this._prefix = prefix;
    }
    names(nameOrNames) {
        const names = typeof nameOrNames === 'string' ? [nameOrNames] : nameOrNames;
        const resultNames = [...names.map((n) => [this._prefix, n].join(''))];
        (0, logger_1.logger)().debug(`Original names: [${names.join(', ')}], prefixed names : [${resultNames.join(', ')}]`);
        return resultNames;
    }
}
exports.PrefixName = PrefixName;
//# sourceMappingURL=prefix-name.js.map