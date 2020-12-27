"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.loggerUtil = void 0;
exports.loggerUtil = {
    _logger: undefined,
    setLogger: (loggerStrategy) => {
        exports.loggerUtil._logger = loggerStrategy;
    },
    getLogger: () => {
        if (exports.loggerUtil._logger === undefined)
            throw new Error('No logger registered');
        return exports.loggerUtil._logger;
    },
};
const logger = () => exports.loggerUtil.getLogger();
exports.logger = logger;
//# sourceMappingURL=logger-util.js.map