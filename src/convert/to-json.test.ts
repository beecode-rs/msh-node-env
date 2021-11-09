import { ToJson } from './to-json'
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
    it('should throw error if unable to convert to json', () => {
      try {
        toJson.convert('not a string')
        expect.fail()
      } catch (e) {
        expect((e as Error).message).to.equal('"not a string" is not a json. Error: Unexpected token o in JSON at position 1')
      }
    })
  })
})
