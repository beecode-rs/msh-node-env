import { EnvLocationStrategy } from './env-location-strategy';
import { ProjectNameIsolation } from './project-name-isolation';
export declare class VersionProjectNameIsolation extends ProjectNameIsolation implements EnvLocationStrategy {
    protected readonly _version: string;
    constructor(projectName: string, version: string);
    getEnvStringValue(): string | undefined;
}
//# sourceMappingURL=version-project-name-isolation.d.ts.map