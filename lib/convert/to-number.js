"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToNumber = void 0;
class ToNumber {
    convert(str) {
        if (str === undefined)
            return undefined;
        if (str.trim() === '')
            return undefined;
        const convertedValue = Number(str);
        if (isNaN(convertedValue))
            throw new Error(`"${str}" is not a number`);
        return convertedValue;
    }
}
exports.ToNumber = ToNumber;
//# sourceMappingURL=to-number.js.map