import { BaseSandbox } from '../index.test'
import { NamingStrategy } from './naming-strategy'
import { SinonSandbox } from 'sinon'

export class MockNamingStrategy extends BaseSandbox implements NamingStrategy {
  public constructor(sandbox: SinonSandbox) {
    super(sandbox)
  }

  public getNames = this._sandbox.stub()
}
