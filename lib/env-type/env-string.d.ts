import { EnvLocationStrategy } from '../env-location/env-location-strategy';
import { BaseEnvStorage } from './base-env-storage';
export declare class EnvString extends BaseEnvStorage<string> {
    constructor(envStrategy: EnvLocationStrategy);
    protected _convertValue(): string | undefined;
    default(defaultValue: string): EnvString;
}
//# sourceMappingURL=env-string.d.ts.map