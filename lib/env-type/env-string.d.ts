import { Env } from '../env';
import { BaseEnvStorage } from './base-env-storage';
export declare class EnvString extends BaseEnvStorage<string> {
    constructor(env: Env);
    protected _convertValue(): string | undefined;
    default(defaultValue: string): EnvString;
}
//# sourceMappingURL=env-string.d.ts.map