import { SinonSandbox, SinonStub } from 'sinon';
export interface MockConvertStrategy<T> {
    convert: SinonStub<string[], T | undefined>;
}
export declare const mockConvertStrategy: <T>(sandbox: SinonSandbox) => any;
//# sourceMappingURL=convert-strategy.test.d.ts.map