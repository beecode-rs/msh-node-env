import { IEnv } from '.';
import { ConvertStrategy } from '../convert';
export declare type EnvTypeParams<T> = {
    convertStrategy: ConvertStrategy<T>;
    env: IEnv;
};
export declare class EnvType<T> {
    private __defaultValue;
    private readonly __convertStrategy;
    private readonly __env;
    private __allowedValues;
    constructor(params: EnvTypeParams<T>);
    default(defaultValue: T): EnvType<T>;
    get optional(): T | undefined;
    get required(): T;
    allowed(...args: T[]): EnvType<T>;
    private __validateAllowedValues;
    private __isUndefined;
}
//# sourceMappingURL=env-type.d.ts.map