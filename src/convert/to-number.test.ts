import { ToNumber } from './to-number'
import assert from 'assert'
import { expect } from 'chai'

describe('convert - ToNumber', () => {
  describe('convert', () => {
    const toNumber = new ToNumber()
    ;([
      ['123', 123],
      ['-123', -123],
      ['10.01', 10.01],
      ['-10.999', -10.999],
      ['0', 0],
    ] as [string, number][]).forEach(([str, expectedValue]) => {
      it(`should convert "${str}" to ${expectedValue} number`, () => {
        expect(toNumber.convert(str)).to.equal(expectedValue)
      })
    })
    ;['bb123', '1.2.3.4', '11,22', '-10.999 x', 'null', 'someWord', 'some sentence', '{"json":"value"}'].forEach((notANumber) => {
      it(`should throw error if "${notANumber}" passed`, () => {
        const checkForError = (): void => {
          toNumber.convert(notANumber)
        }
        assert.throws(checkForError, Error, `"${notANumber}" is not a number`)
      })
    })
    ;['', ' ', '  '].forEach((emptyString) => {
      it(`should return undefined if "${emptyString}" passed`, () => {
        expect(toNumber.convert(emptyString)).to.be.undefined
      })
    })
  })
})
