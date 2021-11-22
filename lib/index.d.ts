import { EnvFactory } from './env/env-factory';
import { LocationStrategy } from './location/location-strategy';
import { NamingStrategy } from './naming/naming-strategy';
export declare type MshNodeEnvReturn = (...name: string[]) => EnvFactory;
export declare const MshNodeEnv: (params?: {
    locationStrategies?: LocationStrategy[];
    namingStrategies?: NamingStrategy[];
}) => MshNodeEnvReturn;
//# sourceMappingURL=index.d.ts.map