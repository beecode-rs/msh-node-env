import { Env } from './env'
import { EnvLocationStrategy } from './env-location/env-location-strategy'
import { SimpleEnvLookup } from './env-location/simple-env-lookup'

export default (envStrategy: EnvLocationStrategy = new SimpleEnvLookup()) => (envName: string): Env => {
  envStrategy.setEnvName(envName)
  return new Env(envStrategy)
}
