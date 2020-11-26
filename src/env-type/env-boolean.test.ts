import { EnvBoolean } from './env-boolean'
import { expect } from 'chai'
import sinon, { assert } from 'sinon'

describe('EnvBoolean', () => {
  describe('_convertValue', () => {
    const dummyTrue = true
    const fake_logger_warn = sinon.fake()
    let envBoolean: EnvBoolean
    beforeEach(() => {
      fake_logger_warn.resetHistory()
      envBoolean = new EnvBoolean({ Logger: { warn: fake_logger_warn } } as any)
    })

    it('should return true if string value is true string in with any case', () => {
      ;['true', 'True', 'TRUE', 'TrUe', 'tRuE'].forEach((strValue) => {
        const result = envBoolean['_convertValue'](strValue)
        assert.notCalled(fake_logger_warn)
        expect(result).to.be.true
        fake_logger_warn.resetHistory()
      })
    })

    it('should return false if string value is false string in with any case', () => {
      ;['false', 'False', 'FALSE', 'FaLsE', 'fAlSe'].forEach((strValue) => {
        const result = envBoolean['_convertValue'](strValue)
        assert.notCalled(fake_logger_warn)
        expect(result).to.be.false
        fake_logger_warn.resetHistory()
      })
    })

    it('should log warning for non boolean values and return default value', () => {
      ;['not boolean', '', undefined].forEach((someValue) => {
        envBoolean['_defaultValue'] = dummyTrue
        const result = envBoolean['_convertValue'](someValue)
        assert.calledOnce(fake_logger_warn)
        assert.calledWith(fake_logger_warn, `"${someValue}" is not a boolean`)
        expect(result).to.equal(dummyTrue)
        fake_logger_warn.resetHistory()
      })
    })
  })
})
