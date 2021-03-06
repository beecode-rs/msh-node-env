"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToJson = void 0;
class ToJson {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    convert(str) {
        if (str.trim() === '')
            return undefined;
        try {
            return JSON.parse(str);
        }
        catch (e) {
            throw new Error(`"${str}" is not a json. Error: ${e.message}`);
        }
    }
}
exports.ToJson = ToJson;
//# sourceMappingURL=to-json.js.map