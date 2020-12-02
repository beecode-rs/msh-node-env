"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToBoolean = void 0;
class ToBoolean {
    convert(str) {
        const strLower = str.toLowerCase();
        if (strLower === 'true') {
            return true;
        }
        else if (strLower === 'false') {
            return false;
        }
        return undefined;
    }
}
exports.ToBoolean = ToBoolean;
//# sourceMappingURL=to-boolean.js.map