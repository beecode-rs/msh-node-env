import { LocationStrategy } from '../location'
import { LoggerStrategy } from '../logger'

export type EnvParams = {
  name: string
  locationStrategy: LocationStrategy
  loggerStrategy: LoggerStrategy
}

export interface IEnv {
  Name: string
  Logger: LoggerStrategy
  getEnvStringValue: () => string | undefined
}

export class Env implements IEnv {
  private readonly __name: string
  private readonly __locationStrategy: LocationStrategy
  private readonly __loggerStrategy: LoggerStrategy

  public get Name(): string {
    return this.__name
  }

  public get Logger(): LoggerStrategy {
    return this.__loggerStrategy
  }

  public constructor(params: EnvParams) {
    this.__locationStrategy = params.locationStrategy
    this.__loggerStrategy = params.loggerStrategy
    this.__name = params.name
  }

  public getEnvStringValue(): string | undefined {
    return this.__locationStrategy.getEnvStringValue(this.Name)
  }
}
