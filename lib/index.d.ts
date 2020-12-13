import { BaseConvert } from './convert';
import { LocationStrategy } from './location';
import { LoggerStrategy } from './logger';
import { NamingStrategy } from './naming';
export declare type MshNodeEnvParams = {
    loggerStrategy?: LoggerStrategy;
    locationStrategies?: LocationStrategy[];
    namingStrategies?: NamingStrategy[];
};
export declare type MshNodeEnvReturn = (name: string) => BaseConvert;
export declare const MshNodeEnv: (params?: MshNodeEnvParams) => MshNodeEnvReturn;
export default MshNodeEnv;
export * as location from './location';
export * as logger from './logger';
export * as naming from './naming';
//# sourceMappingURL=index.d.ts.map