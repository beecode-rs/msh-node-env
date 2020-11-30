import { SimpleEnvLookup } from '.'
import { expect } from 'chai'

describe('SimpleEnvLookup', () => {
  const dummyEnvKey = 'DUMMY_ENV_KEY'
  const dummyEnvValue = 'Some env value'

  afterEach(() => {
    delete process.env[dummyEnvKey]
  })

  it('should return evn value', () => {
    process.env[dummyEnvKey] = dummyEnvValue
    const location = new SimpleEnvLookup()
    expect(location.getEnvStringValue(dummyEnvKey)).to.equal(dummyEnvValue)
  })

  it('should return undefined if key is not set', () => {
    const location = new SimpleEnvLookup()
    expect(location.getEnvStringValue(dummyEnvKey)).to.be.undefined
  })
})
