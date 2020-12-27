import { NamingStrategy } from './naming-strategy'
import { SinonSandbox, SinonStub } from 'sinon'

export interface MockNamingStrategy {
  getNames: SinonStub<(string | string[])[], string[]>
}

export const mockNamingStrategy = (sandbox: SinonSandbox): any => {
  const stub_constructor = sandbox.stub()
  return class implements NamingStrategy, MockNamingStrategy {
    public static STUB_CONSTRUCTOR = stub_constructor

    public constructor(...args: any[]) {
      stub_constructor(...args)
    }

    public getNames = sandbox.stub()
  }
}
