import { Env } from '../env';
import { BaseEnvStorage } from './base-env-storage';
export declare class EnvJSON extends BaseEnvStorage<any> {
    constructor(env: Env);
    protected _convertValue(envStrVal?: any): any | undefined;
    default(defaultValue: any): EnvJSON;
}
//# sourceMappingURL=env-json.d.ts.map