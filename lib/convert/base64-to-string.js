"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base64ToString = void 0;
const base_64_1 = require("base-64");
class Base64ToString {
    convert(str) {
        if (str.trim() === '')
            return undefined;
        try {
            return base_64_1.decode(str);
        }
        catch (e) {
            throw new Error(`"${str}" is not a base64. Error: ${e.message}`);
        }
    }
}
exports.Base64ToString = Base64ToString;
//# sourceMappingURL=base64-to-string.js.map