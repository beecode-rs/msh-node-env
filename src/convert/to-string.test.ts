import { ToString } from './to-string'
import { expect } from 'chai'

describe('convert - ToString', () => {
  describe('convert', () => {
    const toString = new ToString()

    ;['string-a', 'string-b'].forEach((str) => {
      it(`should return "${str}" if "${str}" passed`, () => {
        expect(toString.convert(str)).to.equal(str)
      })
    })
    ;['', ' ', '   '].forEach((str) => {
      it(`should return undefined if "${str}" passed`, () => {
        expect(toString.convert(str)).to.be.undefined
      })
    })
  })
})
