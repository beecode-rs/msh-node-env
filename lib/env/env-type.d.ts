import { ConvertStrategy } from '../convert/convert-strategy';
import { Env } from './env';
export declare class EnvType<T> {
    protected _defaultValue: T | undefined;
    protected readonly _convertStrategy: ConvertStrategy<T>;
    protected readonly _env: Env;
    protected _allowedValues: T[];
    constructor(params: {
        convertStrategy: ConvertStrategy<T>;
        env: Env;
    });
    default(defaultValue: T): EnvType<T>;
    get optional(): T | undefined;
    get required(): T;
    allowed(...args: T[]): EnvType<T>;
    protected _validateAllowedValues(value?: T): void;
    protected _allowedValuesDoNotContain(value?: T): boolean;
    protected _allowedValuesToString(): string;
    protected _loggerDebug(msg: string, ...args: {
        [k: string]: any;
    }[]): void;
    protected _createError(msg: string): Error;
    protected get _EnvName(): string;
}
//# sourceMappingURL=env-type.d.ts.map