"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToJson = void 0;
class ToJson {
    convert(str) {
        if (str === undefined)
            return undefined;
        if (str.trim() === '')
            return undefined;
        try {
            return JSON.parse(str);
        }
        catch (err) {
            throw new Error(`"${str}" is not a json. Error: ${err.message}`);
        }
    }
}
exports.ToJson = ToJson;
//# sourceMappingURL=to-json.js.map