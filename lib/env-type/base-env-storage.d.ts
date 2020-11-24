import { Env } from '../env';
export declare abstract class BaseEnvStorage<T> {
    protected _defaultValue: T | undefined;
    protected _env: Env;
    protected constructor(env: Env);
    protected abstract _convertValue(envStrVal?: string): T | undefined;
    protected _default(defaultValue: T): void;
    get required(): T;
    get optional(): T | undefined;
}
//# sourceMappingURL=base-env-storage.d.ts.map