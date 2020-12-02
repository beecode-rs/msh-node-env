import { BaseSandbox } from '../index.test'
import { LoggerStrategy } from './logger-strategy'
import { SinonSandbox } from 'sinon'

export class MockLoggerStrategy extends BaseSandbox implements LoggerStrategy {
  public constructor(sandbox: SinonSandbox) {
    super(sandbox)
  }
  public debug = this._sandbox.stub()
  public error = this._sandbox.stub()
  public info = this._sandbox.stub()
  public warn = this._sandbox.stub()
}
