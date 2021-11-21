"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports._logger = void 0;
exports._logger = {
    debug: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    clone: jest.fn(),
};
const logger = () => {
    return exports._logger;
};
exports.logger = logger;
//# sourceMappingURL=logger.js.map