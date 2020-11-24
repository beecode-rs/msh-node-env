import { Env } from '../env';
import { BaseEnvStorage } from './base-env-storage';
export declare class EnvNumber extends BaseEnvStorage<number> {
    constructor(env: Env);
    protected _convertValue(envStrVal?: string): number | undefined;
    default(defaultValue: number): EnvNumber;
}
//# sourceMappingURL=env-number.d.ts.map