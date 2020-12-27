import { LocationStrategy } from '../location'
import { NamingStrategy } from '../naming'
import { logger } from '../util'

export type EnvParams = {
  name: string
  locationStrategies: LocationStrategy[]
  namingStrategies: NamingStrategy[]
}

export interface IEnv {
  Name: string
  getEnvStringValue: () => string | undefined
}

export class Env implements IEnv {
  private readonly __name: string
  private readonly __locationStrategies: LocationStrategy[]
  private readonly __namingStrategies: NamingStrategy[]

  public get Name(): string {
    return this.__name
  }

  public constructor(params: EnvParams) {
    this.__locationStrategies = params.locationStrategies
    this.__namingStrategies = params.namingStrategies
    this.__name = params.name
  }

  private __getEnvNames(): string[] {
    const result = [this.Name]
    let lastResult = [this.Name]
    for (const ns of this.__namingStrategies) {
      lastResult = ns.getNames(lastResult)
      result.push(...lastResult)
    }
    const resultNames = result.reverse()
    logger().debug(`Try names in this order: [${resultNames.join(', ')}]`)
    return resultNames
  }

  public getEnvStringValue(): string | undefined {
    for (const name of this.__getEnvNames()) {
      for (const ls of this.__locationStrategies) {
        const result = ls.getValueByName(name)
        if (result) {
          logger().debug(`Found env by name: "${name}"`)
          return result
        }
      }
    }
    return undefined
  }
}
