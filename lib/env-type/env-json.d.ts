import { EnvLocationStrategy } from '../env-location/env-location-strategy';
import { BaseEnvStorage } from './base-env-storage';
export declare class EnvJSON extends BaseEnvStorage<any> {
    constructor(envStrategy: EnvLocationStrategy);
    protected _convertValue(envStrVal?: any): any | undefined;
    default(defaultValue: any): EnvJSON;
}
//# sourceMappingURL=env-json.d.ts.map