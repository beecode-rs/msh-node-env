import { ToBoolean } from './'
import { expect } from 'chai'

describe('ToBoolean', () => {
  describe('convert', () => {
    const toBoolean = new ToBoolean()

    it('should return true if string value is true string in with any case', () => {
      ;['true', 'True', 'TRUE', 'TrUe', 'tRuE'].forEach((strValue) => {
        expect(toBoolean.convert(strValue)).to.be.true
      })
    })

    it('should return false if string value is false string in with any case', () => {
      ;['false', 'False', 'FALSE', 'FaLsE', 'fAlSe'].forEach((strValue) => {
        expect(toBoolean.convert(strValue)).to.be.false
      })
    })

    it('should log warning for non boolean values and return default value', () => {
      ;['not boolean', ''].forEach((someValue) => {
        expect(toBoolean.convert(someValue)).to.be.undefined
      })
    })
  })
})
