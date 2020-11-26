import { EnvString } from './env-string'
import { expect } from 'chai'
import sinon, { assert } from 'sinon'

describe('EnvString', () => {
  describe('_convertValue', () => {
    const dummyString = 'some-dummy-string-value'

    const fake_logger_warn = sinon.fake()
    let envString: EnvString
    beforeEach(() => {
      fake_logger_warn.resetHistory()
      envString = new EnvString({ Logger: { warn: fake_logger_warn } } as any)
    })

    it('should return true if string value is true string in with any case', () => {
      ;['string-a', 'string-b'].forEach((strValue) => {
        envString['_defaultValue'] = dummyString
        const result = envString['_convertValue'](strValue)
        assert.notCalled(fake_logger_warn)
        expect(result).to.equal(strValue)
        fake_logger_warn.resetHistory()
      })
    })
    it('should return default value if string empty or undefined', () => {
      ;['', '  ', undefined].forEach((strValue) => {
        envString['_defaultValue'] = dummyString
        const result = envString['_convertValue'](strValue)
        assert.notCalled(fake_logger_warn)
        expect(result).to.equal(dummyString)
        fake_logger_warn.resetHistory()
      })
    })
  })
})
