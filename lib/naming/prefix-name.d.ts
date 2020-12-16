import { NamingStrategy } from '.';
export declare type PrefixNameParams = {
    prefix: string;
    joinChar?: string;
};
export declare class PrefixName implements NamingStrategy {
    private readonly __prefix;
    private readonly __joinChar;
    constructor(params: PrefixNameParams);
    getNames(name: string | string[]): string[];
}
//# sourceMappingURL=prefix-name.d.ts.map