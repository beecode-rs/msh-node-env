import { EnvFactory } from './env/env-factory'
import { EnvironmentLocation } from './location/environment-location'
import { LocationStrategy } from './location/location-strategy'
import { NamingStrategy } from './naming/naming-strategy'
import { SimpleName } from './naming/simple-name'
import { logger } from './util/logger'

export type MshNodeEnvReturn = (name: string) => EnvFactory

export const MshNodeEnv = (
  params: { locationStrategies?: LocationStrategy[]; namingStrategies?: NamingStrategy[] } = {}
): MshNodeEnvReturn => {
  const { locationStrategies = [new EnvironmentLocation()], namingStrategies = [new SimpleName()] } = params

  return (name: string): EnvFactory => {
    logger().debug(`Initiate env: "${name}"`)
    return new EnvFactory({ locationStrategies, namingStrategies, name })
  }
}
