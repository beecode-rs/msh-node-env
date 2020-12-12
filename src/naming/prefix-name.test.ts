import { PrefixName } from '.'
import { expect } from 'chai'

describe('naming - PrefixName', () => {
  describe('getNames', () => {
    it('should prefix name with "test" with default join char "_"', () => {
      const prefixName = new PrefixName({ prefix: 'test' })
      expect(prefixName.getNames('some-name')).to.deep.equal(['test_some-name', 'some-name'])
    })
    it('should prefix name with "test" with join char "-"', () => {
      const prefixName = new PrefixName({ prefix: 'test', joinChar: '-' })
      expect(prefixName.getNames('some-name')).to.deep.equal(['test-some-name', 'some-name'])
    })
    it('should prefix array names with "test" with default join char "_"', () => {
      const prefixName = new PrefixName({ prefix: 'test' })
      expect(prefixName.getNames(['name-one', 'name-two'])).to.deep.equal([
        'test_name-one',
        'test_name-two',
        'name-one',
        'name-two',
      ])
    })
    it('should prefix array names with "test" with join char "-"', () => {
      const prefixName = new PrefixName({ prefix: 'test', joinChar: '-' })
      expect(prefixName.getNames(['name-one', 'name-two'])).to.deep.equal([
        'test-name-one',
        'test-name-two',
        'name-one',
        'name-two',
      ])
    })
  })
})
