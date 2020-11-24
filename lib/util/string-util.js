"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringUtil = void 0;
exports.stringUtil = {
    toSnakeCase: (str) => str &&
        (str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || []).map((x) => x.toLowerCase()).join('_'),
};
//# sourceMappingURL=string-util.js.map