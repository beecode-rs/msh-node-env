import { Env } from './env'
import { LocationStrategy, SimpleEnvLookup } from './location'
import { LoggerStrategy, NoneLogger } from './logger'

export type MshNodeEnvParams = {
  locationStrategy?: LocationStrategy
  loggerStrategy?: LoggerStrategy
}

export type MshNodeEnvReturn = (name: string) => Env

export const MshNodeEnv = (params: MshNodeEnvParams = {}): MshNodeEnvReturn => {
  const locationStrategy = params.locationStrategy ?? new SimpleEnvLookup()
  const loggerStrategy = params.loggerStrategy ?? new NoneLogger()
  return (name: string): Env => {
    return new Env({ locationStrategy, loggerStrategy, name })
  }
}

export default MshNodeEnv
