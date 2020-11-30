import { EnvType } from '.'
import { MockConvertStrategy } from '../convert/convert-strategy.test'
import { MockEnv } from './env.test'
import { expect } from 'chai'
import sinon, { assert, createSandbox } from 'sinon'

describe('EnvType', () => {
  const sandbox = createSandbox()

  const mockConvert = new MockConvertStrategy(sandbox)
  const mockEnv = new MockEnv(sandbox)
  const dummyDefaultValue = 'dummyDefaultValue'
  let mockEnvType: EnvType<any>
  beforeEach(() => {
    mockEnvType = new EnvType({ convertStrategy: mockConvert, env: mockEnv })
  })
  afterEach(() => {
    sandbox.reset()
    sinon.restore()
  })
  after(() => {
    sandbox.restore()
  })

  describe('constructor', () => {
    it('should pass properties', () => {
      expect(mockEnvType['__convertStrategy']).to.equal(mockConvert)
      expect(mockEnvType['__env']).to.equal(mockEnv)
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
      mockEnv.getEnvStringValue.returns(undefined)
      mockEnvType['__defaultValue'] = dummyDefaultValue
      const result = mockEnvType.optional
      expect(result).to.equal(dummyDefaultValue)
      assert.calledOnce(mockEnv.getEnvStringValue)
      assert.notCalled(mockConvert.convert)
    })
    it('should return default if convert returns undefined', () => {
      const dummyEnvValue = ' test '
      mockEnv.getEnvStringValue.returns(' test ')
      mockConvert.convert.returns(undefined)
      mockEnvType['__defaultValue'] = dummyDefaultValue
      const result = mockEnvType.optional
      expect(result).to.equal(dummyDefaultValue)
      assert.calledOnce(mockEnv.getEnvStringValue)
      assert.calledOnce(mockConvert.convert)
      assert.calledWith(mockConvert.convert, dummyEnvValue.trim())
    })
    it('should return converted value', () => {
      const dummyEnvValue = ' test '
      const convertedValue = 'convertedTestValue'
      mockEnv.getEnvStringValue.returns(' test ')
      mockConvert.convert.returns(convertedValue)
      mockEnvType['__defaultValue'] = undefined
      const result = mockEnvType.optional
      expect(result).to.equal(convertedValue)
      assert.calledOnce(mockEnv.getEnvStringValue)
      assert.calledOnce(mockConvert.convert)
      assert.calledWith(mockConvert.convert, dummyEnvValue.trim())
    })
  })

  describe('required', () => {
    let spy_envType_optional: any
    beforeEach(() => {
      spy_envType_optional = sinon.spy(EnvType.prototype, 'optional', ['get'])
    })
    it('should throw error if optional return undefined', () => {
      // TODO mock options to return undefined
      try {
        mockEnvType.required
        expect.fail()
      } catch (err) {
        expect(err.message).to.equal(`stub must have value defined`)
      }
      expect(spy_envType_optional.get.calledOnce).to.be.true
    })
    it('should return optional value if it is not undefined', () => {
      // TODO mock optional to return some value
      mockEnvType['__defaultValue'] = dummyDefaultValue
      expect(mockEnvType.required).to.equal(dummyDefaultValue)
    })
  })
})
