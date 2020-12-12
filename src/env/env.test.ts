import { Env, IEnv } from '.'
import { BaseSandbox } from '../index.test'
import { MockLocationStrategy } from '../location/location-strategy.test'
import { MockLoggerStrategy } from '../logger/logger-strategy.test'
import { MockNamingStrategy } from '../naming/naming-strategy.test'
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
  let mockNaming: MockNamingStrategy
  let mockEnv: Env

  beforeEach(() => {
    mockLocation = new MockLocationStrategy(sandbox)
    mockLogger = new MockLoggerStrategy(sandbox)
    mockNaming = new MockNamingStrategy(sandbox)
    mockEnv = new Env({
      name: dummyEnvName,
      locationStrategies: [mockLocation],
      loggerStrategy: mockLogger,
      namingStrategies: [mockNaming],
    })
  })
  afterEach(sandbox.restore)

  describe('constructor', () => {
    it('should setup properties', () => {
      expect(mockEnv['__name']).to.equal(dummyEnvName)
      expect(mockEnv['__locationStrategies']).to.deep.equal([mockLocation])
      expect(mockEnv['__namingStrategies']).to.deep.equal([mockNaming])
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

  describe('__getEnvNames', () => {
    it('should call getNames of naming strategy', () => {
      mockNaming.getNames.returns(['test1'])
      const env = new Env({
        name: dummyEnvName,
        locationStrategies: [mockLocation],
        loggerStrategy: mockLogger,
        namingStrategies: [mockNaming],
      })
      const result = env['__getEnvNames']()
      assert.calledOnce(mockNaming.getNames)
      assert.calledWith(mockNaming.getNames, dummyEnvName)
      expect(result).to.deep.equal(['test1'])
    })
    it('should call getNames of all naming strategy', () => {
      mockNaming.getNames.callsFake((p) => ['test1', ...p])
      const mockNaming2 = new MockNamingStrategy(sandbox)
      mockNaming2.getNames.callsFake((p) => ['test2', p])

      const env = new Env({
        name: dummyEnvName,
        locationStrategies: [mockLocation],
        loggerStrategy: mockLogger,
        namingStrategies: [mockNaming, mockNaming2],
      })
      const result = env['__getEnvNames']()
      assert.calledOnce(mockNaming.getNames)
      assert.calledWith(mockNaming.getNames, ['test2', dummyEnvName])
      assert.calledOnce(mockNaming2.getNames)
      assert.calledWith(mockNaming2.getNames, dummyEnvName)
      assert.callOrder(mockNaming2.getNames, mockNaming.getNames)
      expect(result).to.deep.equal(['test1', 'test2', dummyEnvName])
    })
  })

  describe('getEnvStringValue', () => {
    let stub_env_getEnvNames: SinonStub
    beforeEach(() => {
      stub_env_getEnvNames = sandbox.stub(mockEnv, '__getEnvNames' as any)
    })
    it('should call location strategy getEnvStringValue', () => {
      const getValueReturn = 'envValue'
      const getNamesReturn = ['name']
      stub_env_getEnvNames.returns(getNamesReturn)
      mockLocation.getValueByName.returns(getValueReturn)
      const result = mockEnv.getEnvStringValue()
      assert.calledOnce(mockLocation.getValueByName)
      assert.calledWith(mockLocation.getValueByName, getNamesReturn[0])
      expect(result).to.equal(getValueReturn)
    })
    it('should return undefined if no env found', () => {
      const getNamesReturn = ['name']
      stub_env_getEnvNames.returns(getNamesReturn)
      const result = mockEnv.getEnvStringValue()
      assert.calledOnce(mockLocation.getValueByName)
      assert.calledWith(mockLocation.getValueByName, getNamesReturn[0])
      expect(result).to.be.undefined
    })
  })
})
