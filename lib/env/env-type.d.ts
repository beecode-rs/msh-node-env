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
    constructor(params: EnvTypeParams<T>);
    default(defaultValue: T): EnvType<T>;
    get required(): T;
    get optional(): T | undefined;
}
//# sourceMappingURL=env-type.d.ts.map