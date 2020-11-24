import { EnvLocationStrategy } from './env-location-strategy';
import { SimpleEnvLookup } from './simple-env-lookup';
export declare class ProjectNameIsolation extends SimpleEnvLookup implements EnvLocationStrategy {
    protected readonly _projectName: string;
    constructor(projectName: string);
    getEnvStringValue(): string | undefined;
    private __toSnakeCase;
}
//# sourceMappingURL=project-name-isolation.d.ts.map