import { SinonSandbox, SinonStub } from 'sinon';
export interface MockNamingStrategy {
    getNames: SinonStub<(string | string[])[], string[]>;
}
export declare const mockNamingStrategy: (sandbox: SinonSandbox) => any;
//# sourceMappingURL=naming-strategy.test.d.ts.map