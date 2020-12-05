import { Env } from './env';
import { LocationStrategy } from './location';
import { LoggerStrategy } from './logger';
export declare type MshNodeEnvParams = {
    locationStrategy?: LocationStrategy;
    loggerStrategy?: LoggerStrategy;
};
export declare type MshNodeEnvReturn = (name: string) => Env;
export declare const MshNodeEnv: (params?: MshNodeEnvParams) => MshNodeEnvReturn;
export default MshNodeEnv;
//# sourceMappingURL=index.d.ts.map