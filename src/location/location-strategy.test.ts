import { LocationStrategy } from './location-strategy'
import { SinonSandbox, SinonStub } from 'sinon'

export interface MockLocationStrategy {
  getValueByName: SinonStub<string[], string | undefined>
}

export const mockLocationStrategy = (sandbox: SinonSandbox): any =>
  class implements LocationStrategy, MockLocationStrategy {
    public getValueByName = sandbox.stub()
  }
