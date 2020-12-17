import { NamingStrategy } from './naming-strategy'
import { SinonSandbox, SinonStub } from 'sinon'

export interface MockNamingStrategy {
  getNames: SinonStub<(string | string[])[], string[]>
}

export const mockNamingStrategy = (sandbox: SinonSandbox): any =>
  class implements NamingStrategy, MockNamingStrategy {
    public stub_constructor = sandbox.stub()
    public constructor(...args: any[]) {
      this.stub_constructor(...args)
    }
    public getNames = sandbox.stub()
  }
