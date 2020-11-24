import { EnvLocationStrategy } from '../env-location/env-location-strategy';
export declare abstract class BaseEnvStorage<T> {
    protected _defaultValue: T | undefined;
    protected _envStrategy: EnvLocationStrategy;
    protected constructor(envStrategy: EnvLocationStrategy);
    protected abstract _convertValue(envStrVal?: string): T | undefined;
    protected _default(defaultValue: T): void;
    requiredValue(): T;
    value(): T | undefined;
}
//# sourceMappingURL=base-env-storage.d.ts.map