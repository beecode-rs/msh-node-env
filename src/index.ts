import { BaseConvert } from './convert'
import { Env } from './env'
import { EnvironmentLocation, LocationStrategy } from './location'
import { NamingStrategy, SimpleName } from './naming'
import { loggerUtil } from './util'
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

export default MshNodeEnv
export * as location from './location'
export * as naming from './naming'
