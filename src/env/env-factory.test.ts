import { Base64ToString } from '../convert/base64-to-string'
import { ToBoolean } from '../convert/to-boolean'
import { ToJson } from '../convert/to-json'
import { ToNumber } from '../convert/to-number'
import { ToString } from '../convert/to-string'
import { Env } from './env'
import { EnvFactory } from './env-factory'
import { EnvType } from './env-type'

describe('BaseConvert', () => {
  const envFactory = new EnvFactory({ name: 'test', locationStrategies: [], namingStrategies: [] })

  describe('constructor', () => {
    it('should store env in private _env property', () => {
      expect(envFactory['_env'] instanceof Env).toBeTruthy()
    })
  })

  describe('getter', () => {
    it('should return EnvType with ToString convert strategy', () => {
      const result = envFactory.string
      expect(result instanceof EnvType).toBeTruthy()
      expect(result['_convertStrategy'] instanceof ToString).toBeTruthy()
    })
    it('should return EnvType with ToBoolean convert strategy', () => {
      const result = envFactory.boolean
      expect(result instanceof EnvType).toBeTruthy()
      expect(result['_convertStrategy'] instanceof ToBoolean).toBeTruthy()
    })
    it('should return EnvType with ToNumber convert strategy', () => {
      const result = envFactory.number
      expect(result instanceof EnvType).toBeTruthy()
      expect(result['_convertStrategy'] instanceof ToNumber).toBeTruthy()
    })
    it('should return EnvType with Base64ToString convert strategy', () => {
      const result = envFactory.base64
      expect(result instanceof EnvType).toBeTruthy()
      expect(result['_convertStrategy'] instanceof Base64ToString).toBeTruthy()
    })
    it('should return EnvType with ToJson convert strategy', () => {
      const result = envFactory.json()
      expect(result instanceof EnvType).toBeTruthy()
      expect(result['_convertStrategy'] instanceof ToJson).toBeTruthy()
    })
  })
})
