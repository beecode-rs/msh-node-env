import { LocationStrategy } from './location-strategy'
import sinon from 'sinon'

export class MockLocationStrategy implements LocationStrategy {
  public getEnvStringValue = sinon.fake()
}
