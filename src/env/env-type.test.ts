import { EnvType } from '.'
import { MockConvertStrategy, mockConvertStrategy } from '../convert/convert-strategy.test'
import { MockEnv, mockEnv } from './env.test'
import { expect } from 'chai'
import { SinonStub, assert, createSandbox } from 'sinon'

describe('env - EnvType', () => {
  const sandbox = createSandbox()

  let mckEnv: MockEnv
  let mockConvert: MockConvertStrategy<any>
  const dummyDefaultValue = 'dummyDefaultValue'
  let mockEnvType: EnvType<any>
  beforeEach(() => {
    mckEnv = new (mockEnv(sandbox))()
    mockConvert = new (mockConvertStrategy(sandbox))()
    mockEnvType = new EnvType({ convertStrategy: mockConvert, env: mckEnv })
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
    it('should return default if get env returns undefined', () => {
      mckEnv.getEnvStringValue.returns(undefined)
      mockEnvType['__defaultValue'] = dummyDefaultValue
      const result = mockEnvType.optional
      expect(result).to.equal(dummyDefaultValue)
      assert.calledOnce(mckEnv.getEnvStringValue)
      assert.notCalled(mockConvert.convert)
    })
    it('should return default if convert returns undefined', () => {
      const dummyEnvValue = ' test '
      mckEnv.getEnvStringValue.returns(' test ')
      mockConvert.convert.returns(undefined)
      mockEnvType['__defaultValue'] = dummyDefaultValue
      const result = mockEnvType.optional
      expect(result).to.equal(dummyDefaultValue)
      assert.calledOnce(mckEnv.getEnvStringValue)
      assert.calledOnce(mockConvert.convert)
      assert.calledWith(mockConvert.convert, dummyEnvValue.trim())
    })
    it('should return converted value', () => {
      const dummyEnvValue = ' test '
      const convertedValue = 'convertedTestValue'
      mckEnv.getEnvStringValue.returns(' test ')
      mockConvert.convert.returns(convertedValue)
      mockEnvType['__defaultValue'] = undefined
      const result = mockEnvType.optional
      expect(result).to.equal(convertedValue)
      assert.calledOnce(mckEnv.getEnvStringValue)
      assert.calledOnce(mockConvert.convert)
      assert.calledWith(mockConvert.convert, dummyEnvValue.trim())
    })
  })

  describe('required', () => {
    let stub_envType_optional: SinonStub
    beforeEach(() => {
      stub_envType_optional = sandbox.stub(EnvType.prototype, 'optional')
    })
    it('should throw error if optional return undefined', () => {
      const dummyEnvName = 'DUMMY_ENV_NAME'
      const fake_env_name_get = sandbox.fake.returns(dummyEnvName)
      mckEnv.stubName.get(fake_env_name_get)
      const fake_optional_get = sandbox.fake.returns(undefined)
      stub_envType_optional.get(fake_optional_get)
      try {
        mockEnvType.required
        expect.fail()
      } catch (err) {
        expect(err.message).to.equal(`${dummyEnvName} must have value defined`)
      }
      assert.calledOnce(fake_env_name_get)
      assert.calledOnce(fake_optional_get)
    })
    it('should return optional value if it is not undefined', () => {
      const dummyOptionalValue = 'someValue'
      const fake_optional_get = sandbox.fake.returns(dummyOptionalValue)
      stub_envType_optional.get(fake_optional_get)
      expect(mockEnvType.required).to.equal(dummyOptionalValue)
      assert.calledOnce(fake_optional_get)
    })
  })
})
