import { stringUtil } from './string-util'
import { expect } from 'chai'

describe('stringUtil', () => {
  describe('toSnakeCase', () => {
    it('should convert any case to snake case', () => {
      ;[
        ['TEST', 'test'],
        ['this is  a test', 'this_is_a_test'],
        ['this-is-_a|test', 'this_is_a_test'],
        ['PascalCase', 'pascal_case'],
        ['camelCase', 'camel_case'],
        ['snake_case', 'snake_case'],
      ].forEach(([value, expected]) => {
        const result = stringUtil.toSnakeCase(value)
        expect(result).to.equal(expected)
      })
    })
  })
})
