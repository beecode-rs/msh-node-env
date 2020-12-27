import { SinonSandbox, SinonStub } from 'sinon';
export interface MockEnv {
    Name: string;
    stubName: SinonStub<void[], string>;
    getEnvStringValue: SinonStub<void[], string | undefined>;
}
export declare const mockEnv: (sandbox: SinonSandbox) => any;
//# sourceMappingURL=env.test.d.ts.map