import { ToString } from '.'
import { expect } from 'chai'

describe('ToString', () => {
  describe('convert', () => {
    const toString = new ToString()

    it('should return true if string value is true string in with any case', () => {
      ;['string-a', 'string-b'].forEach((str) => {
        expect(toString.convert(str)).to.equal(str)
      })
    })
    it('should return default value if string empty or undefined', () => {
      ;['', ' ', '   '].forEach((str) => {
        expect(toString.convert(str)).to.be.undefined
      })
    })
  })
})
