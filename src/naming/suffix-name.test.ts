import { MockLoggerStrategy, mockLoggerStrategyFactory } from '@beecode/msh-node-log/lib/logger-strategy.test'
import { expect } from 'chai'
import proxyquire from 'proxyquire'
import { createSandbox } from 'sinon'

describe('naming - SuffixName', () => {
  describe('getNames', () => {
    proxyquire.noCallThru()
    const sandbox = createSandbox()

    let mod: any
    let mockLogger: MockLoggerStrategy

    beforeEach(() => {
      mockLogger = new (mockLoggerStrategyFactory(sandbox))()

      mod = proxyquire('./suffix-name', {
        '../util': { logger: (): MockLoggerStrategy => mockLogger },
      })
    })
    afterEach(sandbox.restore)

    it('should suffix name with "test" with default join char "_"', () => {
      const suffixName = new mod.SuffixName({ suffix: 'test' })
      expect(suffixName.getNames('some-name')).to.deep.equal(['some-name_test'])
    })
    it('should suffix name with "test" with join char "-"', () => {
      const suffixName = new mod.SuffixName({ suffix: 'test', joinChar: '-' })
      expect(suffixName.getNames('some-name')).to.deep.equal(['some-name-test'])
    })
    it('should suffix array names with "test" with default join char "_"', () => {
      const suffixName = new mod.SuffixName({ suffix: 'test' })
      expect(suffixName.getNames(['name-one', 'name-two'])).to.deep.equal(['name-one_test', 'name-two_test'])
    })
    it('should suffix array names with "test" with join char "-"', () => {
      const suffixName = new mod.SuffixName({ suffix: 'test', joinChar: '-' })
      expect(suffixName.getNames(['name-one', 'name-two'])).to.deep.equal(['name-one-test', 'name-two-test'])
    })
  })
})
