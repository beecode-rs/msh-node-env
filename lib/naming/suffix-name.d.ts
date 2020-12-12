import { NamingStrategy } from '.';
export declare type SuffixNameParams = {
    suffix: string;
    joinChar?: string;
};
export declare class SuffixName implements NamingStrategy {
    private readonly __suffix;
    private readonly __joinChar;
    constructor(params: SuffixNameParams);
    getNames(name: string | string[]): string[];
}
//# sourceMappingURL=suffix-name.d.ts.map