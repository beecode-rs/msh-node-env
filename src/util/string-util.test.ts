import { stringUtil } from './string-util'

describe('util - stringUtil', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  describe('toSnakeCase', () => {
    it('should convert any case to snake case', () => {
      ;(
        [
          ['', ''],
          [' ', ''],
          ['  ', ''],
          ['TEST', 'test'],
          ['this is  a test', 'this_is_a_test'],
          ['this-is-_a|test', 'this_is_a_test'],
          ['PascalCase', 'pascal_case'],
          ['camelCase', 'camel_case'],
          ['snake_case', 'snake_case'],
        ] as [string, string][]
      ).forEach(([value, expected]) => {
        const result = stringUtil.toSnakeCase(value)
        expect(result).toEqual(expected)
      })
    })
  })
  describe('toSnakeUpperCase', () => {
    let spy_stringUtil_toSnakeCase: jest.SpyInstance
    beforeEach(() => {
      spy_stringUtil_toSnakeCase = jest.spyOn(stringUtil, 'toSnakeCase')
    })

    it('should return snake and make it upper case', () => {
      const dummySnakeCase = 'snake_case'
      spy_stringUtil_toSnakeCase.mockReturnValue(dummySnakeCase)
      expect(stringUtil.toSnakeUpperCase('snakeCase')).toEqual('SNAKE_CASE')
    })
  })
})
