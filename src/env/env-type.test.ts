import { MockConvertStrategy, mockConvertStrategy } from '../convert/convert-strategy.test'
import { EnvType } from './env-type'
import { MockEnv, mockEnv } from './env.test'
import { MockLoggerStrategy, mockLoggerStrategyFactory } from '@beecode/msh-node-log/lib/logger-strategy.test'
import { expect } from 'chai'
import proxyquire from 'proxyquire'
import { SinonStub, assert, createSandbox } from 'sinon'
import { inspect } from 'util'

const jsonPrintHelper = (v: any): string => inspect(v, false, 2)

describe('env - EnvType', () => {
  proxyquire.noCallThru()
  const sandbox = createSandbox()
  let mod: any
  let mockLogger: MockLoggerStrategy
  let mckEnv: MockEnv
  let mockConvert: MockConvertStrategy<any>
  const dummyDefaultValue = 'dummyDefaultValue'
  let mockEnvType: EnvType<any>
  let deepEqualStub: SinonStub

  beforeEach(() => {
    mockLogger = new (mockLoggerStrategyFactory(sandbox))()
    deepEqualStub = sandbox.stub()
    mod = proxyquire('./env-type', {
      '../util/logger-util': { logger: (): MockLoggerStrategy => mockLogger },
      'deep-equal': deepEqualStub,
    })
    mckEnv = new (mockEnv(sandbox))()
    mockConvert = new (mockConvertStrategy(sandbox))()
    mockEnvType = new mod.EnvType({ convertStrategy: mockConvert, env: mckEnv })
  })
  afterEach(sandbox.restore)

  describe('constructor', () => {
    it('should pass properties', () => {
      expect(mockEnvType['__convertStrategy']).to.equal(mockConvert)
      expect(mockEnvType['__env']).to.equal(mckEnv)
    })
  })

  describe('default', () => {
    it('should set defaultValue', () => {
      mockEnvType['__defaultValue'] = undefined
      const result = mockEnvType.default(dummyDefaultValue)
      expect(result).to.equal(mockEnvType)
      expect(mockEnvType['__defaultValue']).to.equal(dummyDefaultValue)
    })
  })

  describe('optional', () => {
    let stub_envType_validateAllowedValues: SinonStub
    beforeEach(() => {
      stub_envType_validateAllowedValues = sandbox.stub(mockEnvType as any, '__validateAllowedValues')
    })
    it('should return default if get env returns undefined', () => {
      mckEnv.envStringValue.returns(undefined)
      mockEnvType['__defaultValue'] = dummyDefaultValue
      const result = mockEnvType.optional
      expect(result).to.equal(dummyDefaultValue)
      assert.calledOnce(mckEnv.envStringValue)
      assert.notCalled(mockConvert.convert)
      assert.calledOnce(stub_envType_validateAllowedValues)
      assert.calledWith(stub_envType_validateAllowedValues, result)
    })
    it('should return default if convert returns undefined', () => {
      const dummyEnvValue = ' test '
      mckEnv.envStringValue.returns(' test ')
      mockConvert.convert.returns(undefined)
      mockEnvType['__defaultValue'] = dummyDefaultValue
      const result = mockEnvType.optional
      expect(result).to.equal(dummyDefaultValue)
      assert.calledOnce(mckEnv.envStringValue)
      assert.calledOnce(mockConvert.convert)
      assert.calledWith(mockConvert.convert, dummyEnvValue.trim())
      assert.calledOnce(stub_envType_validateAllowedValues)
      assert.calledWith(stub_envType_validateAllowedValues, result)
    })
    it('should return converted value', () => {
      const dummyEnvValue = ' test '
      const convertedValue = 'convertedTestValue'
      mckEnv.envStringValue.returns(' test ')
      mockConvert.convert.returns(convertedValue)
      mockEnvType['__defaultValue'] = undefined
      const result = mockEnvType.optional
      expect(result).to.equal(convertedValue)
      assert.calledOnce(mckEnv.envStringValue)
      assert.calledOnce(mockConvert.convert)
      assert.calledWith(mockConvert.convert, dummyEnvValue.trim())
      assert.calledOnce(stub_envType_validateAllowedValues)
      assert.calledWith(stub_envType_validateAllowedValues, result)
    })
  })

  describe('required', () => {
    let stub_envType_optional: SinonStub
    let stub_envType_isUndefined: SinonStub
    beforeEach(() => {
      stub_envType_optional = sandbox.stub(mod.EnvType.prototype, 'optional')
      stub_envType_isUndefined = sandbox.stub(mockEnvType as any, '__isUndefined')
      stub_envType_isUndefined.returns(false)
    })
    it('should throw error if optional return undefined', () => {
      const dummyEnvName = 'DUMMY_ENV_NAME'
      const fake_env_name_get = sandbox.fake.returns(dummyEnvName)
      mckEnv.stubName.get(fake_env_name_get)
      const fake_optional_get = sandbox.fake.returns(undefined)
      stub_envType_isUndefined.returns(true)
      stub_envType_optional.get(fake_optional_get)
      try {
        mockEnvType.required
        expect.fail()
      } catch (err) {
        expect((err as Error).message).to.equal(`${dummyEnvName} must have value defined`)
      }
      assert.calledOnce(fake_env_name_get)
      assert.calledOnce(fake_optional_get)
      assert.calledOnce(stub_envType_isUndefined)
    })
    it('should return optional value if it is not undefined', () => {
      const dummyOptionalValue = 'someValue'
      const fake_optional_get = sandbox.fake.returns(dummyOptionalValue)
      stub_envType_optional.get(fake_optional_get)
      expect(mockEnvType.required).to.equal(dummyOptionalValue)
      assert.calledOnce(fake_optional_get)
      assert.calledOnce(stub_envType_isUndefined)
    })
  })

  describe('allowed', () => {
    it('should set allowedValues', () => {
      const dummyAllowedValues = ['test', 'test2']
      expect(mockEnvType['__allowedValues']).to.deep.equal([])
      mockEnvType.allowed(...dummyAllowedValues)
      expect(mockEnvType['__allowedValues']).to.deep.equal(dummyAllowedValues)
    })
  })

  describe('__validateAllowedValues', () => {
    let stub_envType_isUndefined: SinonStub
    const dummyAllowedValues = ['test', 'test2']
    beforeEach(() => {
      stub_envType_isUndefined = sandbox.stub(mockEnvType as any, '__isUndefined')
      stub_envType_isUndefined.returns(false)
    })
    it('should do nothing if allowed values is empty', () => {
      expect(mockEnvType['__allowedValues']).to.deep.equal([])
      mockEnvType['__validateAllowedValues']('any value')
      assert.notCalled(stub_envType_isUndefined)
      assert.notCalled(deepEqualStub)
    })
    it('should throw error if undefined is passed and we have allowed values', () => {
      mockEnvType['__allowedValues'] = dummyAllowedValues
      try {
        stub_envType_isUndefined.returns(true)
        mockEnvType['__validateAllowedValues'](undefined)
        expect.fail()
      } catch (err) {
        expect((err as Error).message).to.equal(
          ` must have one of the fallowing values [${dummyAllowedValues.map(jsonPrintHelper).join(', ')}]`
        )
        assert.calledOnce(stub_envType_isUndefined)
        assert.notCalled(deepEqualStub)
      }
    })
    it('should throw error if value is not allowed', () => {
      mockEnvType['__allowedValues'] = dummyAllowedValues
      try {
        mockEnvType['__validateAllowedValues']('wrongValue')
        expect.fail()
      } catch (err) {
        expect((err as Error).message).to.equal(
          ` must have one of the fallowing values [${dummyAllowedValues.map(jsonPrintHelper).join(', ')}]`
        )
        assert.calledOnce(stub_envType_isUndefined)
        assert.calledTwice(deepEqualStub)
      }
    })
    it('should not throw error', () => {
      deepEqualStub.returns(true)
      mockEnvType['__allowedValues'] = dummyAllowedValues
      mockEnvType['__validateAllowedValues']('test')
      assert.calledOnce(stub_envType_isUndefined)
      assert.calledOnce(deepEqualStub)
    })
  })

  describe('__isUndefined', () => {
    it('should return true if value sent is undefined', () => {
      expect(mockEnvType['__isUndefined'](undefined)).to.true
    })
    it('should return false if value sent is not undefined', () => {
      expect(mockEnvType['__isUndefined']('anything else')).to.false
    })
    it('should return false if value sent is null', () => {
      expect(mockEnvType['__isUndefined'](null)).to.false
    })
  })
})
