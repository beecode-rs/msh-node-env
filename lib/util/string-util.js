"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringUtil = exports._self = void 0;
exports._self = {
    toSnakeCase: (str) => {
        return (str &&
            (str.trim().match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [])
                .map((x) => x.toLowerCase())
                .join('_'));
    },
    toSnakeUpperCase: (str) => {
        return exports._self.toSnakeCase(str).toUpperCase();
    },
};
exports.stringUtil = exports._self;
//# sourceMappingURL=string-util.js.map