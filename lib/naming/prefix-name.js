"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrefixName = void 0;
class PrefixName {
    constructor(params) {
        var _a;
        this.__prefix = params.prefix;
        this.__joinChar = (_a = params.joinChar) !== null && _a !== void 0 ? _a : '_';
    }
    getNames(name) {
        const names = typeof name === 'string' ? [name] : name;
        return [...names.map((n) => [this.__prefix, n].join(this.__joinChar)), ...names];
    }
}
exports.PrefixName = PrefixName;
//# sourceMappingURL=prefix-name.js.map