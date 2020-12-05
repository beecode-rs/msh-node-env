import { ConvertStrategy } from '.'
import { BaseSandbox } from '../index.test'
import { SinonSandbox } from 'sinon'

export class MockConvertStrategy extends BaseSandbox implements ConvertStrategy<any> {
  public constructor(sandbox: SinonSandbox) {
    super(sandbox)
  }
  public convert = this._sandbox.stub()
}
