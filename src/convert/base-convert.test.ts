import { Base64ToString, BaseConvert, ToBoolean, ToJson, ToNumber, ToString } from '.'
import { Env, EnvType } from '../env'
import { expect } from 'chai'

describe('BaseConvert', () => {
  const dummyEnv = {} as Env
  const baseConvert = new BaseConvert(dummyEnv)

  describe('constructor', () => {
    it('should store env in private __env property', () => {
      expect(baseConvert['__env']).to.equal(dummyEnv)
    })
  })

  describe('getter', () => {
    it('should return EnvType with ToString convert strategy', () => {
      const result = baseConvert.string
      expect(result).to.be.an.instanceof(EnvType)
      expect(result['__convertStrategy']).to.be.an.instanceof(ToString)
    })
    it('should return EnvType with ToBoolean convert strategy', () => {
      const result = baseConvert.boolean
      expect(result).to.be.an.instanceof(EnvType)
      expect(result['__convertStrategy']).to.be.an.instanceof(ToBoolean)
    })
    it('should return EnvType with ToNumber convert strategy', () => {
      const result = baseConvert.number
      expect(result).to.be.an.instanceof(EnvType)
      expect(result['__convertStrategy']).to.be.an.instanceof(ToNumber)
    })
    it('should return EnvType with Base64ToString convert strategy', () => {
      const result = baseConvert.base64
      expect(result).to.be.an.instanceof(EnvType)
      expect(result['__convertStrategy']).to.be.an.instanceof(Base64ToString)
    })
    it('should return EnvType with ToJson convert strategy', () => {
      const result = baseConvert.json()
      expect(result).to.be.an.instanceof(EnvType)
      expect(result['__convertStrategy']).to.be.an.instanceof(ToJson)
    })
  })
})
