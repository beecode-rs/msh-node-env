import { Env } from './env';
import { EnvLocationStrategy } from './env-location/env-location-strategy';
import { LoggerStrategy } from './logger/logger-strategy';
export declare type MshNodeEnvParams = {
    locationStrategy?: EnvLocationStrategy;
    loggerStrategy?: LoggerStrategy;
};
export declare type MshNodeReturn = (name: string) => Env;
declare const _default: (params?: MshNodeEnvParams) => MshNodeReturn;
export default _default;
//# sourceMappingURL=index.d.ts.map