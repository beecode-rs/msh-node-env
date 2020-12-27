import { BaseConvert } from './convert';
import { LocationStrategy } from './location';
import { NamingStrategy } from './naming';
import { LoggerStrategy } from '@beecode/msh-node-log';
export declare type MshNodeEnvParams = {
    loggerStrategy?: LoggerStrategy;
    locationStrategies?: LocationStrategy[];
    namingStrategies?: NamingStrategy[];
};
export declare type MshNodeEnvReturn = (name: string) => BaseConvert;
export declare const MshNodeEnv: (params?: MshNodeEnvParams) => MshNodeEnvReturn;
export default MshNodeEnv;
export * as location from './location';
export * as naming from './naming';
//# sourceMappingURL=index.d.ts.map