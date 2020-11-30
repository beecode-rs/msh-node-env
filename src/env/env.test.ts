import { Env, IEnv } from '.'
import { BaseSandbox } from '../index.test'
import { MockLocationStrategy } from '../location/location-strategy.test'
import { MockLoggerStrategy } from '../logger/logger-strategy.test'
import { expect } from 'chai'
import sinon, { SinonSandbox, assert } from 'sinon'

export class MockEnv extends BaseSandbox implements IEnv {
  public constructor(sandbox: SinonSandbox) {
    super(sandbox)
  }
  public Logger = this._sandbox.stub() as any
  public Name = this._sandbox.stub() as any
  public getEnvStringValue = this._sandbox.stub()
}

describe('Env', () => {
  const mockLocation = new MockLocationStrategy()
  const mockLogger = new MockLoggerStrategy()
  const dummyEnvName = 'DUMMY_ENV'
  const mockEnv = new Env({ name: dummyEnvName, locationStrategy: mockLocation, loggerStrategy: mockLogger })

  afterEach(sinon.reset)
  after(sinon.restore)

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
