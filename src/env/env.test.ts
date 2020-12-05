import { Env, IEnv } from '.'
import { BaseSandbox } from '../index.test'
import { MockLocationStrategy } from '../location/location-strategy.test'
import { MockLoggerStrategy } from '../logger/logger-strategy.test'
import { expect } from 'chai'
import { SinonSandbox, SinonStub, assert, createSandbox } from 'sinon'

export class MockEnv extends BaseSandbox implements IEnv {
  public constructor(sandbox: SinonSandbox) {
    super(sandbox)
  }
  public Logger = new MockLoggerStrategy(this._sandbox)

  public Name = ''
  public stubName = this._sandbox.stub(this, 'Name') as SinonStub

  public getEnvStringValue = this._sandbox.stub()
}

describe('env - Env', () => {
  const sandbox = createSandbox()

  const dummyEnvName = 'DUMMY_ENV'
  let mockLocation: MockLocationStrategy
  let mockLogger: MockLoggerStrategy
  let mockEnv: Env

  beforeEach(() => {
    mockLocation = new MockLocationStrategy(sandbox)
    mockLogger = new MockLoggerStrategy(sandbox)
    mockEnv = new Env({ name: dummyEnvName, locationStrategy: mockLocation, loggerStrategy: mockLogger })
  })
  afterEach(sandbox.restore)

  describe('constructor', () => {
    it('should setup properties', () => {
      expect(mockEnv['__name']).to.equal(dummyEnvName)
      expect(mockEnv['__locationStrategy']).to.equal(mockLocation)
      expect(mockEnv['__loggerStrategy']).to.equal(mockLogger)
    })
  })

  describe('Name', () => {
    it('should return __name when Name called', () => {
      expect(mockEnv.Name).to.equal(dummyEnvName)
    })
  })

  describe('Logger', () => {
    it('should return __loggerStrategy', () => {
      expect(mockEnv.Logger).to.equal(mockLogger)
    })
  })

  describe('getEnvStringValue', () => {
    it('should call location strategy getEnvStringValue', () => {
      mockEnv.getEnvStringValue()
      assert.calledOnce(mockLocation.getEnvStringValue)
    })
  })
})
