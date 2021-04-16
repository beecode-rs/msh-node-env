import { SimpleName } from './simple-name'
import { expect } from 'chai'

describe('naming - SimpleName', () => {
  describe('getNames', () => {
    it('should return array of name', () => {
      const simpleName = new SimpleName()
      expect(simpleName.getNames('some-name')).to.deep.equal(['some-name'])
    })
    it('should return array of names', () => {
      const simpleName = new SimpleName()
      expect(simpleName.getNames(['some-name'])).to.deep.equal(['some-name'])
    })
    it('should return array of multiple names', () => {
      const simpleName = new SimpleName()
      expect(simpleName.getNames(['some-name', 'some-name2'])).to.deep.equal(['some-name', 'some-name2'])
    })
  })
})
