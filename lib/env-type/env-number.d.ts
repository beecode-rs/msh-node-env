import { EnvLocationStrategy } from '../env-location/env-location-strategy';
import { BaseEnvStorage } from './base-env-storage';
export declare class EnvNumber extends BaseEnvStorage<number> {
    constructor(envStrategy: EnvLocationStrategy);
    protected _convertValue(envStrVal?: string): number | undefined;
    default(defaultValue: number): EnvNumber;
}
//# sourceMappingURL=env-number.d.ts.map