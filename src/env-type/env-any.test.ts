import { EnvAny } from './env-any'
import { expect } from 'chai'
import sinon, { assert } from 'sinon'

describe('EnvAny', () => {
  describe('_convertValue', () => {
    const dummyAny = { dummy: 'any' }
    const fake_logger_warn = sinon.fake()
    let envAny: EnvAny
    beforeEach(() => {
      fake_logger_warn.resetHistory()
      envAny = new EnvAny({ Logger: { warn: fake_logger_warn } } as any)
    })

    it('should return any value as long as it is valid', () => {
      ;['anyValue', 'some-Other-valUE'].forEach((strValue) => {
        const result = envAny['_convertValue'](strValue)
        assert.notCalled(fake_logger_warn)
        expect(result).to.equal(strValue)
        fake_logger_warn.resetHistory()
      })
    })

    it('should return default value if value is invalid', () => {
      ;['', ' ', undefined].forEach((stringOrUndefined) => {
        envAny['_defaultValue'] = dummyAny
        const result = envAny['_convertValue'](stringOrUndefined)
        assert.notCalled(fake_logger_warn)
        expect(result).to.equal(dummyAny)
        fake_logger_warn.resetHistory()
      })
    })
  })
})
