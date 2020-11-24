import { EnvLocationStrategy } from './env-location/env-location-strategy';
import { EnvBase64 } from './env-type/env-base64';
import { EnvBoolean } from './env-type/env-boolean';
import { EnvJSON } from './env-type/env-json';
import { EnvNumber } from './env-type/env-number';
import { EnvString } from './env-type/env-string';
export declare class Env {
    private readonly __envStrategy;
    constructor(envStrategy: EnvLocationStrategy);
    get String(): EnvString;
    get Boolean(): EnvBoolean;
    get Number(): EnvNumber;
    get Json(): EnvJSON;
    get Base64(): EnvBase64;
}
//# sourceMappingURL=env.d.ts.map