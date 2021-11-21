"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const console_logger_1 = require("@beecode/msh-node-log/lib/console-logger");
const no_logger_1 = require("@beecode/msh-node-log/lib/no-logger");
describe('logger', () => {
    describe('NodeAppLogger', () => {
        it('should retrieve default logger', () => {
            const defaultLogger = (0, logger_1.logger)();
            expect(defaultLogger instanceof no_logger_1.NoLogger).toBeTruthy();
        });
        it('should allow to change logger', () => {
            const newLogger = new console_logger_1.ConsoleLogger();
            (0, logger_1.NodeEnvLogger)(newLogger);
            const currentLogger = (0, logger_1.logger)();
            expect(currentLogger instanceof console_logger_1.ConsoleLogger).toBeTruthy();
        });
    });
});
//# sourceMappingURL=logger.test.js.map