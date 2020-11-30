import { SinonSandbox } from 'sinon'

export abstract class BaseSandbox {
  protected readonly _sandbox: SinonSandbox
  protected constructor(sandbox: SinonSandbox) {
    this._sandbox = sandbox
  }
}
