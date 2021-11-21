import { logger } from '../util/logger'
import { PrefixName } from './prefix-name'
import assert from 'assert'

jest.mock('../util/logger')

describe('PrefixName', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  describe('names', () => {
    it('should prefix name with "test" with default join char "_"', () => {
      const prefixName = new PrefixName('test_')
      assert.deepEqual(prefixName.names('some-name'), ['test_some-name'])
    })

    it('should prefix name with "test" with join char "-"', () => {
      const prefixName = new PrefixName('test-')
      assert.deepEqual(prefixName.names('some-name'), ['test-some-name'])
    })

    it('should prefix array names with "test" with default join char "_"', () => {
      const prefixName = new PrefixName('test_')
      assert.deepEqual(prefixName.names(['name-one', 'name-two']), ['test_name-one', 'test_name-two'])
    })

    it('should prefix array names with "test" with join char "-"', () => {
      const prefixName = new PrefixName('test-')
      assert.deepEqual(prefixName.names(['name-one', 'name-two']), ['test-name-one', 'test-name-two'])
    })

    it('should log messages for debugging', () => {
      const prefixName = new PrefixName('test_')
      prefixName.names('some-name')
      expect(logger().debug).toHaveBeenCalledTimes(1)
      expect(logger().debug).toHaveBeenCalledWith('Original names: [some-name], prefixed names : [test_some-name]')
    })
  })
})
