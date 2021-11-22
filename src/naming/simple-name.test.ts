import { SimpleName } from './simple-name'
import assert from 'assert'

describe('SimpleName', () => {
  describe('names', () => {
    it('should return array of name', () => {
      const simpleName = new SimpleName()
      assert.deepEqual(simpleName.names(['some-name']), ['some-name'])
    })

    it('should return array of names', () => {
      const simpleName = new SimpleName()
      assert.deepEqual(simpleName.names(['some-name']), ['some-name'])
    })

    it('should return array of multiple names', () => {
      const simpleName = new SimpleName()
      assert.deepEqual(simpleName.names(['some-name', 'some-name2']), ['some-name', 'some-name2'])
    })
  })
})
