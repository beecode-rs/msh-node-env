import { LoggerStrategy } from './logger-strategy'
import sinon from 'sinon'

export class MockLoggerStrategy implements LoggerStrategy {
  public debug = sinon.fake()
  public error = sinon.fake()
  public info = sinon.fake()
  public warn = sinon.fake()
}
