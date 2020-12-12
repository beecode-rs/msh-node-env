import { LocationStrategy } from '../location'
import { LoggerStrategy } from '../logger'
import { NamingStrategy } from '../naming'

export type EnvParams = {
  name: string
  loggerStrategy: LoggerStrategy
  locationStrategies: LocationStrategy[]
  namingStrategies: NamingStrategy[]
}

export interface IEnv {
  Name: string
  Logger: LoggerStrategy
  getEnvStringValue: () => string | undefined
}

export class Env implements IEnv {
  private readonly __name: string
  private readonly __loggerStrategy: LoggerStrategy
  private readonly __locationStrategies: LocationStrategy[]
  private readonly __namingStrategies: NamingStrategy[]

  public get Name(): string {
    return this.__name
  }

  public get Logger(): LoggerStrategy {
    return this.__loggerStrategy
  }

  public constructor(params: EnvParams) {
    this.__locationStrategies = params.locationStrategies
    this.__loggerStrategy = params.loggerStrategy
    this.__namingStrategies = params.namingStrategies
    this.__name = params.name
  }

  private __getEnvNames(): string[] {
    return this.__namingStrategies.reverse().reduce<string[]>((acc, ns) => {
      return ns.getNames(acc.length > 0 ? acc : this.Name)
    }, [] as string[])
  }

  public getEnvStringValue(): string | undefined {
    for (const name of this.__getEnvNames()) {
      for (const ls of this.__locationStrategies) {
        const result = ls.getValueByName(name)
        if (result) return result
      }
    }
    return undefined
  }
}
