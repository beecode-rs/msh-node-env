import { Env } from './env'
import { EnvLocationStrategy } from './env-location/env-location-strategy'
import { SimpleEnvLookup } from './env-location/simple-env-lookup'
import { LoggerStrategy } from './logger/logger-strategy'

export type MshNodeEnvParams = {
  locationStrategy?: EnvLocationStrategy
  loggerStrategy?: LoggerStrategy
}

export type MshNodeReturn = (name: string) => Env

export default (params: MshNodeEnvParams): MshNodeReturn => {
  const locationStrategy = params.locationStrategy ?? new SimpleEnvLookup()
  return (name: string): Env => {
    return new Env({ locationStrategy, name })
  }
}
