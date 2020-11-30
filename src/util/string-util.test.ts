import { stringUtil } from '.'
import { expect } from 'chai'
import sinon, { SinonStub } from 'sinon'

describe('stringUtil', () => {
  describe('toSnakeCase', () => {
    it('should convert any case to snake case', () => {
      ;([
        ['', ''],
        [' ', ''],
        ['  ', ''],
        ['TEST', 'test'],
        ['this is  a test', 'this_is_a_test'],
        ['this-is-_a|test', 'this_is_a_test'],
        ['PascalCase', 'pascal_case'],
        ['camelCase', 'camel_case'],
        ['snake_case', 'snake_case'],
      ] as [string, string][]).forEach(([value, expected]) => {
        const result = stringUtil.toSnakeCase(value)
        expect(result).to.equal(expected)
      })
    })
  })

  describe('toSnakeUpperCase', () => {
    let stub_stringUtil_toSnakeCase: SinonStub
    beforeEach(() => {
      stub_stringUtil_toSnakeCase = sinon.stub(stringUtil, 'toSnakeCase')
    })
    afterEach(() => {
      sinon.restore()
    })

    it('should return snake and make it upper case', () => {
      const dummySnakeCase = 'snake_case'
      stub_stringUtil_toSnakeCase.returns(dummySnakeCase)
      expect(stringUtil.toSnakeUpperCase('snakeCase')).to.equal('SNAKE_CASE')
    })
  })
})
