import { MockLoggerStrategy, mockLoggerStrategyFactory } from '@beecode/msh-node-log/lib/logger-strategy.test'
import { expect } from 'chai'
import proxyquire from 'proxyquire'
import { createSandbox } from 'sinon'

describe('naming - PrefixName', () => {
  proxyquire.noCallThru()
  const sandbox = createSandbox()

  let mod: any
  let mockLogger: MockLoggerStrategy

  beforeEach(() => {
    mockLogger = new (mockLoggerStrategyFactory(sandbox))()

    mod = proxyquire('./prefix-name', {
      '../util': { logger: (): MockLoggerStrategy => mockLogger },
    })
  })
  afterEach(sandbox.restore)

  describe('getNames', () => {
    it('should prefix name with "test" with default join char "_"', () => {
      const prefixName = new mod.PrefixName({ prefix: 'test' })
      expect(prefixName.getNames('some-name')).to.deep.equal(['test_some-name'])
    })
    it('should prefix name with "test" with join char "-"', () => {
      const prefixName = new mod.PrefixName({ prefix: 'test', joinChar: '-' })
      expect(prefixName.getNames('some-name')).to.deep.equal(['test-some-name'])
    })
    it('should prefix array names with "test" with default join char "_"', () => {
      const prefixName = new mod.PrefixName({ prefix: 'test' })
      expect(prefixName.getNames(['name-one', 'name-two'])).to.deep.equal(['test_name-one', 'test_name-two'])
    })
    it('should prefix array names with "test" with join char "-"', () => {
      const prefixName = new mod.PrefixName({ prefix: 'test', joinChar: '-' })
      expect(prefixName.getNames(['name-one', 'name-two'])).to.deep.equal(['test-name-one', 'test-name-two'])
    })
  })
})
