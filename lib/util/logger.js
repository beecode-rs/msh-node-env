"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.NodeEnvLogger = void 0;
const no_logger_1 = require("@beecode/msh-node-log/lib/no-logger");
let _logger = new no_logger_1.NoLogger();
const NodeEnvLogger = (logger) => {
    _logger = logger;
};
exports.NodeEnvLogger = NodeEnvLogger;
const logger = () => {
    return _logger;
};
exports.logger = logger;
//# sourceMappingURL=logger.js.map