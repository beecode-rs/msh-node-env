import { MockLocationStrategy, mockLocationStrategy } from '../location/location-strategy.test'
import { MockNamingStrategy, mockNamingStrategy } from '../naming/naming-strategy.test'
import { Env, IEnv } from './env'
import { MockLoggerStrategy, mockLoggerStrategyFactory } from '@beecode/msh-node-log/lib/logger-strategy.test'
import { expect } from 'chai'
import proxyquire from 'proxyquire'
import { SinonSandbox, SinonStub, assert, createSandbox } from 'sinon'

export interface MockEnv {
  Name: string
  stubName: SinonStub<void[], string>
  envStringValue: SinonStub<void[], string | undefined>
}
export const mockEnv = (sandbox: SinonSandbox): any => {
  const stub_constructor = sandbox.stub()
  return class implements IEnv, MockEnv {
    public STUB_CONSTRUCTOR = stub_constructor

    public constructor(...args: any[]) {
      stub_constructor(...args)
    }

    public Name = ''
    public stubName = sandbox.stub(this, 'Name') as SinonStub
    public envStringValue = sandbox.stub()
  }
}

describe('env - Env', () => {
  proxyquire.noCallThru()
  const sandbox = createSandbox()
  let mod: any

  const dummyEnvName = 'DUMMY_ENV'
  let mockLocation: MockLocationStrategy
  let mockNaming: MockNamingStrategy
  let mockEnv: Env
  let mockLogger: MockLoggerStrategy

  beforeEach(() => {
    mockLogger = new (mockLoggerStrategyFactory(sandbox))()
    mockLocation = new (mockLocationStrategy(sandbox))()
    mockNaming = new (mockNamingStrategy(sandbox))()
    mod = proxyquire('./env', {
      '../util/logger-util': { logger: (): MockLoggerStrategy => mockLogger },
    })
    mockEnv = new mod.Env({
      name: dummyEnvName,
      locationStrategies: [mockLocation],
      namingStrategies: [mockNaming],
    })
  })
  afterEach(sandbox.restore)

  describe('constructor', () => {
    it('should setup properties', () => {
      expect(mockEnv['__name']).to.equal(dummyEnvName)
      expect(mockEnv['__locationStrategies']).to.deep.equal([mockLocation])
      expect(mockEnv['__namingStrategies']).to.deep.equal([mockNaming])
    })
  })

  describe('Name', () => {
    it('should return __name when Name called', () => {
      expect(mockEnv.Name).to.equal(dummyEnvName)
    })
  })

  describe('__envNames', () => {
    it('should call getNames of naming strategy', () => {
      mockNaming.getNames.returns(['test1'])
      const env = new mod.Env({
        name: dummyEnvName,
        locationStrategies: [mockLocation],
        namingStrategies: [mockNaming],
      })
      const result = env['__envNames']()
      assert.calledOnce(mockNaming.getNames)
      assert.calledWith(mockNaming.getNames, [dummyEnvName])
      expect(result).to.deep.equal(['test1', dummyEnvName])
    })

    it('should simulate double prefixing', () => {
      const fakePrefixFactory = (prefix: string) => (name: string | string[]): string[] => {
        const names = typeof name === 'string' ? [name] : name
        return [...names.map((n) => [prefix, n].join('_'))]
      }
      const mockNaming1 = new (mockNamingStrategy(sandbox))()
      mockNaming1.getNames.callsFake(fakePrefixFactory('FIRST'))
      const mockNaming2 = new (mockNamingStrategy(sandbox))()
      mockNaming2.getNames.callsFake(fakePrefixFactory('SECOND'))

      const env = new mod.Env({
        name: dummyEnvName,
        locationStrategies: [mockLocation],
        namingStrategies: [mockNaming1, mockNaming2],
      })
      const result = env['__envNames']()
      assert.calledOnce(mockNaming1.getNames)
      assert.calledWith(mockNaming1.getNames, [dummyEnvName])
      assert.calledOnce(mockNaming2.getNames)
      assert.calledWith(mockNaming2.getNames, [`FIRST_${dummyEnvName}`])
      assert.callOrder(mockNaming1.getNames, mockNaming2.getNames)
      expect(result).to.deep.equal([`SECOND_FIRST_${dummyEnvName}`, `FIRST_${dummyEnvName}`, dummyEnvName])
    })
  })

  describe('envStringValue', () => {
    let stub_env_getEnvNames: SinonStub
    beforeEach(() => {
      stub_env_getEnvNames = sandbox.stub(mockEnv, '__envNames' as any)
    })
    it('should call location strategy envStringValue', () => {
      const getValueReturn = 'envValue'
      const getNamesReturn = ['name']
      stub_env_getEnvNames.returns(getNamesReturn)
      mockLocation.getValueByName.returns(getValueReturn)
      const result = mockEnv.envStringValue()
      assert.calledOnce(mockLocation.getValueByName)
      assert.calledWith(mockLocation.getValueByName, getNamesReturn[0])
      expect(result).to.equal(getValueReturn)
    })
    it('should return undefined if no env found', () => {
      const getNamesReturn = ['name']
      stub_env_getEnvNames.returns(getNamesReturn)
      const result = mockEnv.envStringValue()
      assert.calledOnce(mockLocation.getValueByName)
      assert.calledWith(mockLocation.getValueByName, getNamesReturn[0])
      expect(result).to.be.undefined
    })
  })
})
