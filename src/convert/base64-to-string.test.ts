import { Base64ToString } from './base64-to-string'
import { expect } from 'chai'

describe('Base64ToString', () => {
  describe('convert', () => {
    const base64ToString = new Base64ToString()

    it('should convert base64 to string', () => {
      ;([
        ['dGVzdA==', 'test'],
        ['c29tZSBsb25nIHRlc3Q=', 'some long test'],
        ['c29tZQpsb25nCnRlc3QKd2l0aApuZXcKcm93cw==', 'some\nlong\ntest\nwith\nnew\nrows'],
      ] as [string, string][]).forEach(([str, expectedValue]) => {
        expect(base64ToString.convert(str)).to.equal(expectedValue)
      })
    })

    it('should return undefined if empty string passed', () => {
      ;['', ' ', '  '].forEach((emptyString) => {
        expect(base64ToString.convert(emptyString)).to.be.undefined
      })
    })
    it('should throw error', () => {
      ;['-', '!', 'dGVzdA!!'].forEach((notAllowedString) => {
        try {
          base64ToString.convert(notAllowedString)
          expect.fail()
        } catch (err) {
          expect(err.message).to.equal('Invalid character: the string to be decoded is not correctly encoded.')
        }
      })
    })
  })
})
