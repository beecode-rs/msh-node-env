import { Env } from '../env';
import { BaseEnvStorage } from './base-env-storage';
export declare class EnvBase64 extends BaseEnvStorage<string> {
    constructor(env: Env);
    protected _convertValue(envStrVal?: string): string | undefined;
    default(defaultValue: string): EnvBase64;
}
//# sourceMappingURL=env-base64.d.ts.map