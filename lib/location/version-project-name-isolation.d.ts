import { LocationStrategy } from './';
import { ProjectNameIsolation } from './project-name-isolation';
export declare type VersionProjectNameIsolationParams = {
    projectName: string;
    version: string;
};
export declare class VersionProjectNameIsolation extends ProjectNameIsolation implements LocationStrategy {
    protected readonly _version: string;
    constructor(params: VersionProjectNameIsolationParams);
    private get __Version();
    private __envProjectVersionName;
    getEnvStringValue(envName: string): string | undefined;
}
//# sourceMappingURL=version-project-name-isolation.d.ts.map