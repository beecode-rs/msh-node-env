import { LoggerStrategy } from './logger-strategy';
export declare type ConsoleLogFunction = (msg: string, obj?: any) => void;
export declare enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3
}
export declare class ConsoleLogging implements LoggerStrategy {
    private readonly __logLevel;
    constructor(logLevel?: LogLevel);
    private __logMessage;
    debug(msg: string, obj?: any): void;
    info(msg: string, obj?: any): void;
    warn(msg: string, obj?: any): void;
    error(msg: string, obj?: any): void;
}
//# sourceMappingURL=console-logging.d.ts.map