"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuffixName = void 0;
const util_1 = require("../util");
class SuffixName {
    constructor(params) {
        var _a;
        this.__suffix = params.suffix;
        this.__joinChar = (_a = params.joinChar) !== null && _a !== void 0 ? _a : '_';
    }
    getNames(name) {
        const names = typeof name === 'string' ? [name] : name;
        const resultNames = [...names.map((n) => [n, this.__suffix].join(this.__joinChar))];
        util_1.logger().debug(`Original names: [${names.join(', ')}], suffixed names : [${resultNames.join(', ')}]`);
        return resultNames;
    }
}
exports.SuffixName = SuffixName;
//# sourceMappingURL=suffix-name.js.map