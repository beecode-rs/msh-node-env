import { LocationStrategy } from './';
import { ProjectNameIsolation } from './project-name-isolation';
export declare class VersionProjectNameIsolation extends ProjectNameIsolation implements LocationStrategy {
    protected readonly _version: string;
    constructor(projectName: string, version: string);
    getEnvStringValue(envName: string): string | undefined;
}
//# sourceMappingURL=version-project-name-isolation.d.ts.map