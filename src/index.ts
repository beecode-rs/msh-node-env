import { BaseConvert } from './convert/base-convert'
import { Env } from './env/env'
import { EnvironmentLocation } from './location/environment-location'
import { LocationStrategy } from './location/location-strategy'
import { NamingStrategy } from './naming/naming-strategy'
import { SimpleName } from './naming/simple-name'
import { loggerUtil } from './util/logger-util'
import { LoggerStrategy, NoLogger } from '@beecode/msh-node-log'

export type MshNodeEnvParams = {
  loggerStrategy?: LoggerStrategy
  locationStrategies?: LocationStrategy[]
  namingStrategies?: NamingStrategy[]
}

export type MshNodeEnvReturn = (name: string) => BaseConvert

export const MshNodeEnv = (params: MshNodeEnvParams = {}): MshNodeEnvReturn => {
  const logger = params.loggerStrategy ?? new NoLogger()
  loggerUtil.setLogger(logger)
  const locationStrategies = params.locationStrategies ?? [new EnvironmentLocation()]
  const namingStrategies = params.namingStrategies ?? [new SimpleName()]
  return (name: string): BaseConvert => {
    logger.debug(`Initiate env: "${name}"`)
    return new BaseConvert(new Env({ locationStrategies, namingStrategies, name }))
  }
}
