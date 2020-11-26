import { EnvLocationStrategy } from './env-location/env-location-strategy';
import { EnvAny } from './env-type/env-any';
import { EnvBase64 } from './env-type/env-base64';
import { EnvBoolean } from './env-type/env-boolean';
import { EnvJSON } from './env-type/env-json';
import { EnvNumber } from './env-type/env-number';
import { EnvString } from './env-type/env-string';
import { LoggerStrategy } from './logger/logger-strategy';
export declare type EnvParams = {
    name: string;
    locationStrategy: EnvLocationStrategy;
    loggerStrategy: LoggerStrategy;
};
export declare class Env {
    private readonly __locationStrategy;
    private readonly __name;
    private readonly __loggerStrategy;
    get Logger(): LoggerStrategy;
    get name(): string;
    constructor(params: EnvParams);
    getEnvStringValue(): string | undefined;
    get string(): EnvString;
    get boolean(): EnvBoolean;
    get number(): EnvNumber;
    get json(): EnvJSON;
    get any(): EnvAny;
    get base64(): EnvBase64;
}
//# sourceMappingURL=env.d.ts.map