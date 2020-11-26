import { EnvNumber } from './env-number'
import { expect } from 'chai'
import sinon, { assert } from 'sinon'

describe('EnvNumber', () => {
  describe('_convertValue', () => {
    const dummyNumber = 1234567890
    const fake_logger_warn = sinon.fake()
    let envNumber: EnvNumber
    beforeEach(() => {
      fake_logger_warn.resetHistory()
      envNumber = new EnvNumber({ Logger: { warn: fake_logger_warn } } as any)
    })

    it('should convert to number if string is valid number', () => {
      ;[
        ['123', 123],
        ['-123', -123],
        ['10.01', 10.01],
        ['-10.999', -10.999],
        ['0', 0],
      ].forEach(([strValue, expectedValue]) => {
        const result = envNumber['_convertValue'](strValue as string)
        assert.notCalled(fake_logger_warn)
        expect(result).to.equal(expectedValue)
        fake_logger_warn.resetHistory()
      })
    })

    it('should use default value if not a number was passed', () => {
      ;['bb123', '-1.2.3', '10,01', '-10.999 x', 'null', '', ' ', undefined].forEach((notANumber) => {
        envNumber['_defaultValue'] = dummyNumber
        const result = envNumber['_convertValue'](notANumber)
        assert.calledOnce(fake_logger_warn)
        assert.calledWith(fake_logger_warn, `"${notANumber}" is not a number`)
        expect(result).to.equal(dummyNumber)
        fake_logger_warn.resetHistory()
      })
    })
  })
})
