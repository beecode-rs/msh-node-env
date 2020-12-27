import { ConvertStrategy } from '.'
import { SinonSandbox, SinonStub } from 'sinon'

export interface MockConvertStrategy<T> {
  convert: SinonStub<string[], T | undefined>
}

export const mockConvertStrategy = <T>(sandbox: SinonSandbox): any => {
  const stub_constructor = sandbox.stub()
  return class implements ConvertStrategy<T>, MockConvertStrategy<T> {
    public STUB_CONSTRUCTOR = stub_constructor

    public constructor(...args: any[]) {
      stub_constructor(...args)
    }

    public convert = sandbox.stub()
  }
}
