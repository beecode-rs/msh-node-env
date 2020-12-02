import { BaseSandbox } from '../index.test'
import { LocationStrategy } from './location-strategy'
import { SinonSandbox } from 'sinon'

export class MockLocationStrategy extends BaseSandbox implements LocationStrategy {
  public constructor(sandbox: SinonSandbox) {
    super(sandbox)
  }
  public getEnvStringValue = this._sandbox.stub()
}
