import { LocationStrategy } from '../location';
import { LoggerStrategy } from '../logger';
export declare type EnvParams = {
    name: string;
    locationStrategy: LocationStrategy;
    loggerStrategy: LoggerStrategy;
};
export declare class Env {
    private readonly __name;
    private readonly __locationStrategy;
    private readonly __loggerStrategy;
    get Name(): string;
    get Logger(): LoggerStrategy;
    constructor(params: EnvParams);
    getEnvStringValue(): string | undefined;
}
//# sourceMappingURL=env.d.ts.map