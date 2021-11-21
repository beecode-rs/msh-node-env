import { EnvironmentLocation } from './environment-location'

describe('EnvironmentLocation', () => {
  describe('valueByName', () => {
    it('should return env value', () => {
      process.env.test = 'test-env-value'
      const environmentLocation = new EnvironmentLocation()
      expect(environmentLocation.valueByName('test')).toEqual(process.env.test)
      delete process.env.test
    })
    it('should return undefined if env not set', () => {
      delete process.env.test
      const environmentLocation = new EnvironmentLocation()
      expect(environmentLocation.valueByName('test')).toBeUndefined()
    })
  })
})
