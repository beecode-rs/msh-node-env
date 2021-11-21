import { ToString } from './to-string'

describe('ToString', () => {
  const toString = new ToString()

  it('should return undefined if passed undefined', () => {
    expect(toString.convert(undefined)).toBeUndefined()
    expect(toString.convert()).toBeUndefined()
  })
  ;['string-a', 'string-b'].forEach((str) => {
    it(`should return "${str}" if "${str}" passed`, () => {
      expect(toString.convert(str)).toEqual(str)
    })
  })
  ;['', ' ', '   '].forEach((str) => {
    it(`should return undefined if "${str}" passed`, () => {
      expect(toString.convert(str)).toBeUndefined()
    })
  })
})
