import { Env } from '../env';
import { BaseEnvStorage } from './base-env-storage';
export declare class EnvBoolean extends BaseEnvStorage<boolean> {
    constructor(env: Env);
    protected _convertValue(envStrVal?: string): boolean | undefined;
    default(isDefaultValue: boolean): EnvBoolean;
}
//# sourceMappingURL=env-boolean.d.ts.map