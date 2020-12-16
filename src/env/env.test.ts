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
      assert.calledWith(mockNaming.getNames, [dummyEnvName])
      expect(result).to.deep.equal(['test1', dummyEnvName])
    })

    it('should simulate double prefixing', () => {
      const fakePrefixFactory = (prefix: string) => (name: string | string[]): string[] => {
        const names = typeof name === 'string' ? [name] : name
        return [...names.map((n) => [prefix, n].join('_'))]
      }
      const mockNaming1 = new MockNamingStrategy(sandbox)
      mockNaming1.getNames.callsFake(fakePrefixFactory('FIRST'))
      const mockNaming2 = new MockNamingStrategy(sandbox)
      mockNaming2.getNames.callsFake(fakePrefixFactory('SECOND'))

      const env = new Env({
        name: dummyEnvName,
        locationStrategies: [mockLocation],
        loggerStrategy: mockLogger,
        namingStrategies: [mockNaming1, mockNaming2],
      })
      const result = env['__getEnvNames']()
      assert.calledOnce(mockNaming1.getNames)
      assert.calledWith(mockNaming1.getNames, [dummyEnvName])
      assert.calledOnce(mockNaming2.getNames)
      assert.calledWith(mockNaming2.getNames, [`FIRST_${dummyEnvName}`])
      assert.callOrder(mockNaming1.getNames, mockNaming2.getNames)
      expect(result).to.deep.equal([`SECOND_FIRST_${dummyEnvName}`, `FIRST_${dummyEnvName}`, dummyEnvName])
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
