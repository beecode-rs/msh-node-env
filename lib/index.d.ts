import { BaseConvert } from './convert';
import { LocationStrategy } from './location';
import { LoggerStrategy } from './logger';
export declare type MshNodeEnvParams = {
    locationStrategy?: LocationStrategy;
    loggerStrategy?: LoggerStrategy;
};
export declare type MshNodeEnvReturn = (name: string) => BaseConvert;
export declare const MshNodeEnv: (params?: MshNodeEnvParams) => MshNodeEnvReturn;
export default MshNodeEnv;
export * as location from './location';
export * as logger from './logger';
//# sourceMappingURL=index.d.ts.map