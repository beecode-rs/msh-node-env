"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuffixName = void 0;
const logger_1 = require("../util/logger");
class SuffixName {
    constructor(suffix) {
        this._suffix = suffix;
    }
    names(names) {
        const resultNames = [...names.map((n) => [n, this._suffix].join(''))];
        (0, logger_1.logger)().debug(`Original names: [${names.join(', ')}], suffixed names : [${resultNames.join(', ')}]`);
        return resultNames;
    }
}
exports.SuffixName = SuffixName;
//# sourceMappingURL=suffix-name.js.map