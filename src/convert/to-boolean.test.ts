import { ToBoolean } from '.'
import { expect } from 'chai'

describe('convert - ToBoolean', () => {
  describe('convert', () => {
    const toBoolean = new ToBoolean()

    ;['true', 'True', 'TRUE', 'TrUe', 'tRuE'].forEach((strValue) => {
      it(`should return true if "${strValue}" passed`, () => {
        expect(toBoolean.convert(strValue)).to.be.true
      })
    })
    ;['false', 'False', 'FALSE', 'FaLsE', 'fAlSe'].forEach((strValue) => {
      it(`should return false if "${strValue}" passed`, () => {
        expect(toBoolean.convert(strValue)).to.be.false
      })
    })
    ;['not boolean', ''].forEach((someValue) => {
      it(`should return undefined if "${someValue}" passed`, () => {
        expect(toBoolean.convert(someValue)).to.be.undefined
      })
    })
  })
})
