import { LocationStrategy } from '../location/location-strategy'
import { NamingStrategy } from '../naming/naming-strategy'
import { logger } from '../util/logger-util'

export type EnvParams = {
  name: string
  locationStrategies: LocationStrategy[]
  namingStrategies: NamingStrategy[]
}

export interface IEnv {
  Name: string
  envStringValue: () => string | undefined
}

export class Env implements IEnv {
  private readonly __name: string
  private readonly __locationStrategies: LocationStrategy[]
  private readonly __namingStrategies: NamingStrategy[]

  public get Name(): string {
    return this.__name
  }

  public constructor({ locationStrategies, namingStrategies, name }: EnvParams) {
    this.__locationStrategies = locationStrategies
    this.__namingStrategies = namingStrategies
    this.__name = name
  }

  private __envNames(): string[] {
    const result = [this.Name]
    let lastResult = [this.Name]
    // TODO do not use for loops
    for (const ns of this.__namingStrategies) {
      lastResult = ns.getNames(lastResult)
      result.push(...lastResult)
    }
    const resultNames = result.reverse()
    logger().debug(`Try names in this order: [${resultNames.join(', ')}]`)
    return resultNames
  }

  public envStringValue(): string | undefined {
    // TODO do not use for loops
    for (const name of this.__envNames()) {
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
