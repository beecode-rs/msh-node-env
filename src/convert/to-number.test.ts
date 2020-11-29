import { ToNumber } from './'
import assert from 'assert'
import { expect } from 'chai'

describe('ToNumber', () => {
  describe('convert', () => {
    const toNumber = new ToNumber()
    it('should convert to number if string is valid number', () => {
      ;([
        ['123', 123],
        ['-123', -123],
        ['10.01', 10.01],
        ['-10.999', -10.999],
        ['0', 0],
      ] as [string, number][]).forEach(([str, expectedValue]) => {
        expect(toNumber.convert(str)).to.equal(expectedValue)
      })
    })

    it('should throw error if unable to convert to number', () => {
      ;['bb123', '1.2.3.4', '11,22', '-10.999 x', 'null', 'someWord', 'some sentence', '{"json":"value"}'].forEach(
        (notANumber) => {
          const checkForError = (): void => {
            toNumber.convert(notANumber)
          }
          assert.throws(checkForError, Error, `"${notANumber}" is not a number`)
        }
      )
    })

    it('should return undefined if empty string passed', () => {
      ;['', ' ', '  '].forEach((emptyString) => {
        expect(toNumber.convert(emptyString)).to.be.undefined
      })
    })
  })
})
