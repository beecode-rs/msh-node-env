"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogging = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class ConsoleLogging {
    constructor(logLevel = LogLevel.ERROR) {
        this.__logLevel = logLevel;
    }
    __logMessage(type) {
        return (msg, obj) => {
            if (obj) {
                // eslint-disable-next-line no-console
                console.log(`${type}: ${msg}`);
            }
            else {
                // eslint-disable-next-line no-console
                console.log(`${type}: ${msg}\n`, obj);
            }
        };
    }
    debug(msg, obj) {
        if (this.__logLevel > LogLevel.DEBUG)
            return;
        this.__logMessage('debug')(msg, obj);
    }
    info(msg, obj) {
        if (this.__logLevel > LogLevel.INFO)
            return;
        this.__logMessage('info')(msg, obj);
    }
    warn(msg, obj) {
        if (this.__logLevel > LogLevel.WARN)
            return;
        this.__logMessage('warn')(msg, obj);
    }
    error(msg, obj) {
        if (this.__logLevel > LogLevel.ERROR)
            return;
        this.__logMessage('error')(msg, obj);
    }
}
exports.ConsoleLogging = ConsoleLogging;
//# sourceMappingURL=console-logging.js.map