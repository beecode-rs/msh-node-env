import { ConvertStrategy } from '.'
import { SinonSandbox, SinonStub } from 'sinon'

export interface MockConvertStrategy<T> {
  convert: SinonStub<string[], T | undefined>
}

export const mockConvertStrategy = <T>(sandbox: SinonSandbox): any =>
  class implements ConvertStrategy<T>, MockConvertStrategy<T> {
    public stub_constructor = sandbox.stub()
    public constructor(...args: any[]) {
      this.stub_constructor(...args)
    }
    public convert = sandbox.stub()
  }
