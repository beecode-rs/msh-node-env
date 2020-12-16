import { EnvironmentLocation } from '.'
import { expect } from 'chai'

describe('location - EnvironmentLocation', () => {
  describe('getValueByName', () => {
    it('should return env value', () => {
      process.env.test = 'test-env-value'
      const environmentLocation = new EnvironmentLocation()
      expect(environmentLocation.getValueByName('test')).to.equal(process.env.test)
      delete process.env.test
    })
    it('should return undefined if env not set', () => {
      delete process.env.test
      const environmentLocation = new EnvironmentLocation()
      expect(environmentLocation.getValueByName('test')).to.be.undefined
    })
  })
})
