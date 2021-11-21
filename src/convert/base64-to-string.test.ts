import { Base64ToString } from './base64-to-string'

describe('Base64ToString', () => {
  const base64ToString = new Base64ToString()

  it('should return undefined if passed undefined', () => {
    expect(base64ToString.convert(undefined)).toBeUndefined()
    expect(base64ToString.convert()).toBeUndefined()
  })
  ;(
    [
      ['dGVzdA==', 'test'],
      ['c29tZSBsb25nIHRlc3Q=', 'some long test'],
      ['c29tZQpsb25nCnRlc3QKd2l0aApuZXcKcm93cw==', 'some\nlong\ntest\nwith\nnew\nrows'],
    ] as [string, string][]
  ).forEach(([str, expectedValue]) => {
    it(`should convert base64 "${str}" to string "${expectedValue}"`, () => {
      expect(base64ToString.convert(str)).toEqual(expectedValue)
    })
  })
  ;['', ' ', '  '].forEach((emptyString) => {
    it(`should return undefined if "${emptyString}" passed`, () => {
      expect(base64ToString.convert(emptyString)).toBeUndefined()
    })
  })
  ;['-', '!', 'dGVzdA!!'].forEach((notAllowedString) => {
    it(`should throw error if "${notAllowedString}" passed`, () => {
      try {
        base64ToString.convert(notAllowedString)
        throw new Error('test failed')
      } catch (err) {
        expect((err as Error).message).toEqual(
          `"${notAllowedString}" is not a base64. Error: Invalid character: the string to be decoded is not correctly encoded.`
        )
      }
    })
  })
})
