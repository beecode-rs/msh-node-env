import { LocationStrategy } from '../location/location-strategy';
import { NamingStrategy } from '../naming/naming-strategy';
import { Env } from './env';
import { EnvType } from './env-type';
export declare class EnvFactory {
    protected readonly _env: Env;
    constructor(params: {
        name: string;
        locationStrategies: LocationStrategy[];
        namingStrategies: NamingStrategy[];
    });
    get string(): EnvType<string>;
    get boolean(): EnvType<boolean>;
    get number(): EnvType<number>;
    json<T>(): EnvType<T>;
    get base64(): EnvType<string>;
}
//# sourceMappingURL=env-factory.d.ts.map