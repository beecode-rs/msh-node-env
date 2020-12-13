"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuffixName = void 0;
class SuffixName {
    constructor(params) {
        var _a;
        this.__suffix = params.suffix;
        this.__joinChar = (_a = params.joinChar) !== null && _a !== void 0 ? _a : '_';
    }
    getNames(name) {
        const names = typeof name === 'string' ? [name] : name;
        return [...names.map((n) => [n, this.__suffix].join(this.__joinChar))];
    }
}
exports.SuffixName = SuffixName;
//# sourceMappingURL=suffix-name.js.map