import { EnvJSON } from './env-json'
import { expect } from 'chai'
import sinon, { assert } from 'sinon'

describe('EnvJSON', () => {
  describe('_convertValue', () => {
    const dummyValue = 'dummyValue'
    const fake_logger_warn = sinon.fake()
    let envJson: EnvJSON
    beforeEach(() => {
      fake_logger_warn.resetHistory()
      envJson = new EnvJSON({ Logger: { warn: fake_logger_warn } } as any)
    })

    it('should return default value if passed undefined', () => {
      envJson['_defaultValue'] = dummyValue
      const result = envJson['_convertValue'](undefined)
      assert.notCalled(fake_logger_warn)
      expect(result).to.equal(dummyValue)
    })
    it('should return default value if passed empty string', () => {
      envJson['_defaultValue'] = dummyValue
      const result = envJson['_convertValue']('')
      assert.notCalled(fake_logger_warn)
      expect(result).to.equal(dummyValue)
    })
    it('should return default value if passed string with spaces', () => {
      envJson['_defaultValue'] = dummyValue
      const result = envJson['_convertValue'](' ')
      assert.notCalled(fake_logger_warn)
      expect(result).to.equal(dummyValue)
    })
    it('should return default a warn if non json string passed', () => {
      envJson['_defaultValue'] = dummyValue
      const result = envJson['_convertValue']('not jsons')
      assert.calledOnce(fake_logger_warn)
      assert.calledWith(fake_logger_warn, 'Error parsing JSON: Unexpected token o in JSON at position 1')
      expect(result).to.equal(dummyValue)
    })
    it('should return object parsed from string', () => {
      const jsonObject = { test: 'some test value' }
      const result = envJson['_convertValue'](JSON.stringify(jsonObject))
      assert.notCalled(fake_logger_warn)
      expect(result).not.to.equal(jsonObject)
      expect(result).to.deep.equal(jsonObject)
    })
  })
})
