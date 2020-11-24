import { EnvLocationStrategy } from '../env-location/env-location-strategy';
import { BaseEnvStorage } from './base-env-storage';
export declare class EnvBoolean extends BaseEnvStorage<boolean> {
    constructor(envStrategy: EnvLocationStrategy);
    protected _convertValue(envStrVal?: string): boolean | undefined;
    default(isDefaultValue: boolean): EnvBoolean;
}
//# sourceMappingURL=env-boolean.d.ts.map