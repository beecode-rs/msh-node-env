"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleName = void 0;
class SimpleName {
    names(nameOrNames) {
        return typeof nameOrNames === 'string' ? [nameOrNames] : nameOrNames;
    }
}
exports.SimpleName = SimpleName;
//# sourceMappingURL=simple-name.js.map