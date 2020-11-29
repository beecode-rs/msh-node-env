import { ConvertStrategy } from '../convert';
import { Env } from './';
export declare type BaseEnvStorageParams<T> = {
    convertStrategy: ConvertStrategy<T>;
    env: Env;
};
export declare class EnvType<T> {
    private __defaultValue;
    private readonly __convertStrategy;
    private readonly __env;
    constructor(params: BaseEnvStorageParams<T>);
    default(defaultValue: T): EnvType<T>;
    get required(): T;
    get optional(): T | undefined;
}
//# sourceMappingURL=env-type.d.ts.map