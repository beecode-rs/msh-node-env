import { ToNumber } from './to-number'
import assert from 'assert'

describe('ToNumber', () => {
  const toNumber = new ToNumber()

  it('should return undefined if passed undefined', () => {
    expect(toNumber.convert(undefined)).toBeUndefined()
    expect(toNumber.convert()).toBeUndefined()
  })
  ;(
    [
      ['123', 123],
      ['-123', -123],
      ['10.01', 10.01],
      ['-10.999', -10.999],
      ['0', 0],
    ] as [string, number][]
  ).forEach(([str, expectedValue]) => {
    it(`should convert "${str}" to ${expectedValue} number`, () => {
      expect(toNumber.convert(str)).toEqual(expectedValue)
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
      expect(toNumber.convert(emptyString)).toBeUndefined()
    })
  })
})
