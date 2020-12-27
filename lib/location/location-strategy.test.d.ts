import { SinonSandbox, SinonStub } from 'sinon';
export interface MockLocationStrategy {
    getValueByName: SinonStub<string[], string | undefined>;
}
export declare const mockLocationStrategy: (sandbox: SinonSandbox) => any;
//# sourceMappingURL=location-strategy.test.d.ts.map