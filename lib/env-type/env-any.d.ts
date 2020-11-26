import { Env } from '../env';
import { BaseEnvStorage } from './base-env-storage';
export declare class EnvAny extends BaseEnvStorage<any> {
    constructor(env: Env);
    protected _convertValue(stringOrUndefined?: string): string | undefined;
    default(defaultValue: string): EnvAny;
}
//# sourceMappingURL=env-any.d.ts.map