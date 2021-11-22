import { MockLocationStrategy } from '../location/__mocks__/mock-location-strategy'
import { MockNamingStrategy } from '../naming/__mocks__/mock-naming-strategy'
import { Env } from './env'
import assert from 'assert'

describe.each([
  [['DUMMY_TEST_ENV']],
  [['DUMMY_TEST_ENV', 'DUMMY_TEST_ENV2']],
  [['DUMMY_TEST_ENV', 'DUMMY_TEST_ENV2', 'DUMMY_TEST_ENV3']],
])('Env %p', (dummyEnvNames) => {
  let dummyEnv: Env
  let mockLocationStrategy: MockLocationStrategy
  let mockNamingStrategy: MockNamingStrategy

  beforeEach(() => {
    mockNamingStrategy = new MockNamingStrategy()
    mockLocationStrategy = new MockLocationStrategy()
    dummyEnv = new Env({
      names: dummyEnvNames,
      locationStrategies: [mockLocationStrategy],
      namingStrategies: [mockNamingStrategy],
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  describe('constructor', () => {
    it('should setup properties', () => {
      expect(dummyEnv['_names']).toEqual(dummyEnvNames)
      assert.deepEqual(dummyEnv['_locationStrategies'], [mockLocationStrategy])
      assert.deepEqual(dummyEnv['_namingStrategies'], [mockNamingStrategy])
    })
  })

  describe('Name', () => {
    it('should return _name when Name called', () => {
      expect(dummyEnv.Names).toEqual(dummyEnvNames)
    })
  })

  describe('_envNames', () => {
    it('should call names of naming strategy', () => {
      mockNamingStrategy.names.mockReturnValue(['test1'])
      const result = dummyEnv['_envNames']()
      expect(mockNamingStrategy.names).toHaveBeenCalledTimes(1)
      expect(mockNamingStrategy.names).toHaveBeenCalledWith(expect.arrayContaining(dummyEnvNames))
      assert.deepEqual(result, ['test1', ...dummyEnvNames])
    })

    it('should simulate double prefixing', () => {
      const fakePrefixFactory =
        (prefix: string) =>
        (names: string[]): string[] =>
          names.map((name) => [prefix, name].join(''))

      const mockNamingStrategy1 = new MockNamingStrategy()
      mockNamingStrategy1.names.mockImplementation(fakePrefixFactory('FIRST_'))
      const mockNamingStrategy2 = new MockNamingStrategy()
      mockNamingStrategy2.names.mockImplementation(fakePrefixFactory('SECOND_'))

      const env = new Env({
        names: dummyEnvNames,
        locationStrategies: [mockLocationStrategy],
        namingStrategies: [mockNamingStrategy1, mockNamingStrategy2],
      })
      const result = env['_envNames']()
      expect(mockNamingStrategy1.names).toHaveBeenCalledTimes(1)
      expect(mockNamingStrategy1.names).toHaveBeenCalledWith(dummyEnvNames.slice().reverse())
      expect(mockNamingStrategy2.names).toHaveBeenCalledTimes(1)
      expect(mockNamingStrategy2.names).toHaveBeenCalledWith(
        dummyEnvNames
          .slice()
          .reverse()
          .map((name) => `FIRST_${name}`)
      )

      expect(mockNamingStrategy1.names).toHaveBeenCalledBefore(mockNamingStrategy2.names)
      assert.deepEqual(result, [
        ...dummyEnvNames.map((name) => `SECOND_FIRST_${name}`),
        ...dummyEnvNames.map((name) => `FIRST_${name}`),
        ...dummyEnvNames,
      ])
    })
  })

  describe('envValue', () => {
    let spy_envNames: jest.SpyInstance
    beforeEach(() => {
      spy_envNames = jest.spyOn<any, any>(dummyEnv, '_envNames')
    })
    it('should call location strategy envStringValue', () => {
      const getValueReturn = 'envValue'
      const namesReturn = ['name']
      spy_envNames.mockReturnValue(namesReturn)
      mockLocationStrategy.valueByName.mockReturnValue(getValueReturn)
      const result = dummyEnv.envValue()
      expect(mockLocationStrategy.valueByName).toHaveBeenCalledTimes(1)
      expect(mockLocationStrategy.valueByName).toHaveBeenCalledWith(namesReturn[0])
      expect(result).toEqual(getValueReturn)
    })

    it('should return undefined if no env found', () => {
      const namesReturn = ['name']
      spy_envNames.mockReturnValue(namesReturn)
      const result = dummyEnv.envValue()
      expect(mockLocationStrategy.valueByName).toHaveBeenCalledTimes(1)
      expect(mockLocationStrategy.valueByName).toHaveBeenCalledWith(namesReturn[0])
      expect(result).toBeUndefined()
    })
  })
})
