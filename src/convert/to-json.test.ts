import { ToJson } from '.'
import { expect } from 'chai'

describe('convert - ToJson', () => {
  describe('convert', () => {
    const toJson = new ToJson()

    it('should return object parsed from string', () => {
      const jsonObject = { test: 'some test value' }
      const result = toJson.convert(JSON.stringify(jsonObject))
      expect(result).not.to.equal(jsonObject)
      expect(result).to.deep.equal(jsonObject)
    })
    ;['', ' ', '   '].forEach((str) => {
      it(`should return undefined if "${str}" passed`, () => {
        expect(toJson.convert(str)).to.be.undefined
      })
    })
  })
})
