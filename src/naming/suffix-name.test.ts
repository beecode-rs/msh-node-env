import { logger } from '../util/logger'
import { SuffixName } from './suffix-name'
import assert from 'assert'

jest.mock('../util/logger')

describe('SuffixName', () => {
  describe('names', () => {
    afterEach(() => {
      jest.resetAllMocks()
      jest.restoreAllMocks()
    })

    it('should suffix name with "test" with default join char "_"', () => {
      const suffixName = new SuffixName('_test')
      assert.deepEqual(suffixName.names(['some-name']), ['some-name_test'])
    })

    it('should suffix name with "test" with join char "-"', () => {
      const suffixName = new SuffixName('-test')
      assert.deepEqual(suffixName.names(['some-name']), ['some-name-test'])
    })

    it('should suffix array names with "test" with default join char "_"', () => {
      const suffixName = new SuffixName('_test')
      assert.deepEqual(suffixName.names(['name-one', 'name-two']), ['name-one_test', 'name-two_test'])
    })

    it('should suffix array names with "test" with join char "-"', () => {
      const suffixName = new SuffixName('-test')
      assert.deepEqual(suffixName.names(['name-one', 'name-two']), ['name-one-test', 'name-two-test'])
    })

    it('should log messages for debugging', () => {
      const suffixName = new SuffixName('_test')
      suffixName.names(['some-name'])
      expect(logger().debug).toHaveBeenCalledTimes(1)
      expect(logger().debug).toHaveBeenCalledWith('Original names: [some-name], suffixed names : [some-name_test]')
    })
  })
})
