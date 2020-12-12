import { LocationStrategy } from '../location';
import { LoggerStrategy } from '../logger';
import { NamingStrategy } from '../naming';
export declare type EnvParams = {
    name: string;
    loggerStrategy: LoggerStrategy;
    locationStrategies: LocationStrategy[];
    namingStrategies: NamingStrategy[];
};
export interface IEnv {
    Name: string;
    Logger: LoggerStrategy;
    getEnvStringValue: () => string | undefined;
}
export declare class Env implements IEnv {
    private readonly __name;
    private readonly __loggerStrategy;
    private readonly __locationStrategies;
    private readonly __namingStrategies;
    get Name(): string;
    get Logger(): LoggerStrategy;
    constructor(params: EnvParams);
    private __getEnvNames;
    getEnvStringValue(): string | undefined;
}
//# sourceMappingURL=env.d.ts.map