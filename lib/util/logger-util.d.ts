import { LoggerStrategy } from '@beecode/msh-node-log';
export declare const loggerUtil: {
    _logger: LoggerStrategy | undefined;
    setLogger: (loggerStrategy: LoggerStrategy) => void;
    getLogger: () => LoggerStrategy;
};
export declare const logger: () => LoggerStrategy;
//# sourceMappingURL=logger-util.d.ts.map