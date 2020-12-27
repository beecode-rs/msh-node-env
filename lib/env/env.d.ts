import { LocationStrategy } from '../location';
import { NamingStrategy } from '../naming';
export declare type EnvParams = {
    name: string;
    locationStrategies: LocationStrategy[];
    namingStrategies: NamingStrategy[];
};
export interface IEnv {
    Name: string;
    getEnvStringValue: () => string | undefined;
}
export declare class Env implements IEnv {
    private readonly __name;
    private readonly __locationStrategies;
    private readonly __namingStrategies;
    get Name(): string;
    constructor(params: EnvParams);
    private __getEnvNames;
    getEnvStringValue(): string | undefined;
}
//# sourceMappingURL=env.d.ts.map