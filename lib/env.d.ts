import { EnvLocationStrategy } from './env-location/env-location-strategy';
import { EnvBase64 } from './env-type/env-base64';
import { EnvBoolean } from './env-type/env-boolean';
import { EnvJSON } from './env-type/env-json';
import { EnvNumber } from './env-type/env-number';
import { EnvString } from './env-type/env-string';
import { MshNodeEnvParams } from './index';
export declare type EnvParams = MshNodeEnvParams & {
    name: string;
    locationStrategy: EnvLocationStrategy;
};
export declare class Env {
    private readonly __locationStrategy;
    private readonly __name;
    get name(): string;
    constructor(params: EnvParams);
    getEnvStringValue(): string | undefined;
    get string(): EnvString;
    get boolean(): EnvBoolean;
    get number(): EnvNumber;
    get json(): EnvJSON;
    get base64(): EnvBase64;
}
//# sourceMappingURL=env.d.ts.map