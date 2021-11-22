import { NamingStrategy } from './naming-strategy';
export declare class PrefixName implements NamingStrategy {
    protected readonly _prefix: string;
    constructor(prefix: string);
    names(names: string[]): string[];
}
//# sourceMappingURL=prefix-name.d.ts.map