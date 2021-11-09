import { Env } from '../env/env'
import { EnvType } from '../env/env-type'
import { BaseConvert } from './base-convert'
import { Base64ToString } from './base64-to-string'
import { ToBoolean } from './to-boolean'
import { ToJson } from './to-json'
import { ToNumber } from './to-number'
import { ToString } from './to-string'
import { expect } from 'chai'

describe('convert - BaseConvert', () => {
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
