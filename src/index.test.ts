import { EnvFactory } from './env/env-factory'
import { MshNodeEnv } from './index'
import { EnvironmentLocation } from './location/environment-location'
import { SimpleName } from './naming/simple-name'
import { logger } from './util/logger'

jest.mock('./location/environment-location')
jest.mock('./naming/simple-name')
jest.mock('./env/env-factory')
jest.mock('./util/logger')

describe('MshNodeEnv', () => {
  afterEach(() => {
    jest.resetAllMocks()
    jest.restoreAllMocks()
  })

  it('should all default strategies', () => {
    const result = MshNodeEnv()
    expect(EnvironmentLocation).toHaveBeenCalledTimes(1)
    expect(SimpleName).toHaveBeenCalledTimes(1)
    expect(EnvFactory).not.toHaveBeenCalled()
    expect(typeof result).toEqual('function')
  })

  it('should pass all default strategy to Env on env used', () => {
    const env = MshNodeEnv()
    const name = 'TEST'

    const envResult = env(name)
    expect(EnvFactory).toHaveBeenCalledTimes(1)

    expect(logger().debug).toHaveBeenCalledTimes(1)
    expect(logger().debug).toHaveBeenCalledWith(`Initiate env: "${name}"`)
    expect(EnvFactory).toHaveBeenCalledTimes(1)
    expect(EnvFactory).toHaveBeenCalledWith({
      name,
      locationStrategies: [expect.any(EnvironmentLocation)],
      namingStrategies: [expect.any(SimpleName)],
    })
    expect(envResult instanceof EnvFactory).toBeTruthy()
  })
  it('should not use default strategies if all are passed in constructor', () => {
    const userEnvironmentLocation = new EnvironmentLocation()
    const userSimpleName = new SimpleName()

    jest.resetAllMocks()

    const env = MshNodeEnv({ locationStrategies: [userEnvironmentLocation], namingStrategies: [userSimpleName] })
    const name = 'TEST'
    env(name)

    expect(EnvironmentLocation).not.toHaveBeenCalled()
    expect(SimpleName).not.toHaveBeenCalled()

    expect(EnvFactory).toHaveBeenCalledTimes(1)
    expect(EnvFactory).toHaveBeenCalledWith({
      name,
      locationStrategies: [userEnvironmentLocation],
      namingStrategies: [userSimpleName],
    })
  })
})
