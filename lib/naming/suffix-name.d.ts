import { NamingStrategy } from './naming-strategy';
export declare class SuffixName implements NamingStrategy {
    protected readonly _suffix: string;
    constructor(suffix: string);
    names(nameOrNames: string | string[]): string[];
}
//# sourceMappingURL=suffix-name.d.ts.map