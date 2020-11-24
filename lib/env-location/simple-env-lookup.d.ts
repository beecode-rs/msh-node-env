import { EnvLocationStrategy } from './env-location-strategy';
export declare class SimpleEnvLookup implements EnvLocationStrategy {
    private __envName;
    setEnvName(envName: string): void;
    getEnvName(): string;
    getEnvStringValue(): string | undefined;
}
//# sourceMappingURL=simple-env-lookup.d.ts.map