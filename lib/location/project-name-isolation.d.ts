import { LocationStrategy, SimpleEnvLookup } from './';
export declare class ProjectNameIsolation extends SimpleEnvLookup implements LocationStrategy {
    protected readonly _projectName: string;
    constructor(projectName: string);
    getEnvStringValue(envName: string): string | undefined;
}
//# sourceMappingURL=project-name-isolation.d.ts.map