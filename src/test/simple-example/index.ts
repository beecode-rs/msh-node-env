import MshNodeEnv from '../..'
import { ConsoleLogger, LogLevel } from '@beecode/msh-node-log'
import { expect } from 'chai'
import dotenv from 'dotenv'

dotenv.config({ path: `${__dirname}/.env` })

describe('Simple Example', () => {
  const env = MshNodeEnv({ loggerStrategy: new ConsoleLogger(LogLevel.DEBUG) })
  it('should read required fields from env', () => {
    const config = Object.freeze({
      testEnvString: env('TEST_ENV_STRING').string.required,
      testEnvNumber: env('TEST_ENV_NUMBER').number.required,
      testEnvBoolean: env('TEST_ENV_BOOLEAN').boolean.required,
      testEnvJson: env('TEST_ENV_JSON').json().required,
      testEnvBase64: env('TEST_ENV_BASE64').base64.required,
    })
    expect(config.testEnvString).to.equal('test-env-string')
    expect(config.testEnvNumber).to.equal(42)
    expect(config.testEnvBoolean).to.be.true
    expect(config.testEnvJson).to.deep.equal({ 'test-key': 'test-value' })
    expect(config.testEnvBase64).to.equal('test value')
  })
  it('should read optional fields from evn', () => {
    const config = Object.freeze({
      testEnvString: env('TEST_ENV_STRING').string.optional,
      testEnvNumber: env('TEST_ENV_NUMBER').number.optional,
      testEnvBoolean: env('TEST_ENV_BOOLEAN').boolean.optional,
      testEnvJson: env('TEST_ENV_JSON').json().optional,
      testEnvBase64: env('TEST_ENV_BASE64').base64.optional,
    })
    expect(config.testEnvString).to.equal('test-env-string')
    expect(config.testEnvNumber).to.equal(42)
    expect(config.testEnvBoolean).to.be.true
    expect(config.testEnvJson).to.deep.equal({ 'test-key': 'test-value' })
    expect(config.testEnvBase64).to.equal('test value')
  })
  it('should read undefined optional fields from undefined evn', () => {
    const config = Object.freeze({
      testEnvString: env('NOT_DEFINED_TEST_ENV_STRING').string.optional,
      testEnvNumber: env('NOT_DEFINED_TEST_ENV_NUMBER').number.optional,
      testEnvBoolean: env('NOT_DEFINED_TEST_ENV_BOOLEAN').boolean.optional,
      testEnvJson: env('NOT_DEFINED_TEST_ENV_JSON').json().optional,
      testEnvBase64: env('NOT_DEFINED_TEST_ENV_BASE64').base64.optional,
    })
    expect(config.testEnvString).to.be.undefined
    expect(config.testEnvNumber).to.be.undefined
    expect(config.testEnvBoolean).to.be.undefined
    expect(config.testEnvJson).to.be.undefined
    expect(config.testEnvBase64).to.be.undefined
  })
  it('should read default value if required but undefined evn', () => {
    const config = Object.freeze({
      testEnvString: env('NOT_DEFINED_TEST_ENV_STRING').string.default('default-value').required,
      testEnvNumber: env('NOT_DEFINED_TEST_ENV_NUMBER').number.default(66).required,
      testEnvBoolean: env('NOT_DEFINED_TEST_ENV_BOOLEAN').boolean.default(false).required,
      testEnvJson: env('NOT_DEFINED_TEST_ENV_JSON').json().default({ 'default-key': 'default-value' }).required,
      testEnvBase64: env('NOT_DEFINED_TEST_ENV_BASE64').base64.default('default value').required,
    })
    expect(config.testEnvString).to.equal('default-value')
    expect(config.testEnvNumber).to.equal(66)
    expect(config.testEnvBoolean).to.be.false
    expect(config.testEnvJson).to.deep.equal({ 'default-key': 'default-value' })
    expect(config.testEnvBase64).to.equal('default value')
  })
  describe('throw error', () => {
    it('should throw error if required string is not defined', () => {
      try {
        Object.freeze({
          testEnvString: env('NOT_DEFINED_TEST_ENV_STRING').string.required,
        })
        expect.fail()
      } catch (e) {
        expect(e.message).to.equal('NOT_DEFINED_TEST_ENV_STRING must have value defined')
      }
    })
    it('should throw error if required number is not defined', () => {
      try {
        Object.freeze({
          testEnvNumber: env('NOT_DEFINED_TEST_ENV_NUMBER').number.required,
        })
        expect.fail()
      } catch (e) {
        expect(e.message).to.equal('NOT_DEFINED_TEST_ENV_NUMBER must have value defined')
      }
    })
    it('should throw error if required boolean is not defined', () => {
      try {
        Object.freeze({
          testEnvBoolean: env('NOT_DEFINED_TEST_ENV_BOOLEAN').boolean.required,
        })
        expect.fail()
      } catch (e) {
        expect(e.message).to.equal('NOT_DEFINED_TEST_ENV_BOOLEAN must have value defined')
      }
    })
    it('should throw error if required json is not defined', () => {
      try {
        Object.freeze({
          testEnvJson: env('NOT_DEFINED_TEST_ENV_JSON').json().required,
        })
        expect.fail()
      } catch (e) {
        expect(e.message).to.equal('NOT_DEFINED_TEST_ENV_JSON must have value defined')
      }
    })
    it('should throw error if required base64 is not defined', () => {
      try {
        Object.freeze({
          testEnvBase64: env('NOT_DEFINED_TEST_ENV_BASE64').base64.required,
        })
        expect.fail()
      } catch (e) {
        expect(e.message).to.equal('NOT_DEFINED_TEST_ENV_BASE64 must have value defined')
      }
    })
  })
  describe('unable to convert', () => {
    it('should throw error if unable to convert number', () => {
      try {
        Object.freeze({
          testEnvNumber: env('TEST_ENV_STRING').number.optional,
        })
      } catch (e) {
        expect(e.message).to.equal('"test-env-string" is not a number')
      }
    })
    it('should throw error if unable to convert boolean', () => {
      try {
        Object.freeze({
          testEnvBoolean: env('TEST_ENV_STRING').boolean.optional,
        })
      } catch (e) {
        expect(e.message).to.equal('"test-env-string" is not a boolean')
      }
    })
    it('should throw error if unable to convert json', () => {
      try {
        Object.freeze({
          testEnvJson: env('TEST_ENV_STRING').json().optional,
        })
      } catch (e) {
        expect(e.message).to.equal('"test-env-string" is not a json. Error: Unexpected token e in JSON at position 1')
      }
    })
    it('should throw error if unable to convert base64', () => {
      try {
        Object.freeze({
          testEnvBase64: env('TEST_ENV_STRING').base64.optional,
        })
      } catch (e) {
        expect(e.message).to.equal(
          '"test-env-string" is not a base64. Error: Invalid character: the string to be decoded is not correctly encoded.'
        )
      }
    })
  })
  describe('throw error not allowed value', () => {
    it('should throw error if string not in allowed list', () => {
      try {
        Object.freeze({
          testEnvString: env('TEST_ENV_STRING').string.allowed('test', 'test2').required,
        })
        expect.fail()
      } catch (e) {
        expect(e.message).to.equal("TEST_ENV_STRING must have one of the fallowing values ['test', 'test2']")
      }
    })
    it('should throw error if json not in allowed list', () => {
      try {
        Object.freeze({
          testEnvString: env('TEST_ENV_JSON').json().allowed({ some: 'test' }).required,
        })
        expect.fail()
      } catch (e) {
        expect(e.message).to.equal("TEST_ENV_JSON must have one of the fallowing values [{ some: 'test' }]")
      }
    })
  })
  describe('no error if value in allowed values', () => {
    it('should not throw error if string in allowed list', () => {
      Object.freeze({
        testEnvString: env('TEST_ENV_STRING').string.allowed('test', 'test2', 'test-env-string').required,
      })
    })
    it('should not throw error if json in allowed list', () => {
      Object.freeze({
        testEnvString: env('TEST_ENV_JSON').json().allowed({ some: 'test' }, { 'test-key': 'test-value' }).required,
      })
    })
  })
})
