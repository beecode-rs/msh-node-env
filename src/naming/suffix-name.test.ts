import { SuffixName } from '.'
import { expect } from 'chai'

describe('naming - SuffixName', () => {
  describe('getNames', () => {
    it('should suffix name with "test" with default join char "_"', () => {
      const suffixName = new SuffixName({ suffix: 'test' })
      expect(suffixName.getNames('some-name')).to.deep.equal(['some-name_test', 'some-name'])
    })
    it('should suffix name with "test" with join char "-"', () => {
      const suffixName = new SuffixName({ suffix: 'test', joinChar: '-' })
      expect(suffixName.getNames('some-name')).to.deep.equal(['some-name-test', 'some-name'])
    })
    it('should suffix array names with "test" with default join char "_"', () => {
      const suffixName = new SuffixName({ suffix: 'test' })
      expect(suffixName.getNames(['name-one', 'name-two'])).to.deep.equal([
        'name-one_test',
        'name-two_test',
        'name-one',
        'name-two',
      ])
    })
    it('should suffix array names with "test" with join char "-"', () => {
      const suffixName = new SuffixName({ suffix: 'test', joinChar: '-' })
      expect(suffixName.getNames(['name-one', 'name-two'])).to.deep.equal([
        'name-one-test',
        'name-two-test',
        'name-one',
        'name-two',
      ])
    })
  })
})
