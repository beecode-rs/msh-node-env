import { BaseConvert } from './convert/base-convert';
import { LocationStrategy } from './location/location-strategy';
import { NamingStrategy } from './naming/naming-strategy';
import { LoggerStrategy } from '@beecode/msh-node-log';
export declare type MshNodeEnvParams = {
    loggerStrategy?: LoggerStrategy;
    locationStrategies?: LocationStrategy[];
    namingStrategies?: NamingStrategy[];
};
export declare type MshNodeEnvReturn = (name: string) => BaseConvert;
export declare const MshNodeEnv: (params?: MshNodeEnvParams) => MshNodeEnvReturn;
//# sourceMappingURL=index.d.ts.map