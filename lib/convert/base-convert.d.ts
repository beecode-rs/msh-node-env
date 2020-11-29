import { Env, EnvType } from '../env';
export declare class BaseConvert {
    private readonly __env;
    constructor(env: Env);
    get string(): EnvType<string>;
    get boolean(): EnvType<boolean>;
    get number(): EnvType<number>;
    json<T>(): EnvType<T>;
    get base64(): EnvType<string>;
}
//# sourceMappingURL=base-convert.d.ts.map