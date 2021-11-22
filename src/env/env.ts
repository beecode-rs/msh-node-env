import { LocationStrategy } from '../location/location-strategy'
import { NamingStrategy } from '../naming/naming-strategy'
import { logger } from '../util/logger'

export class Env {
  protected readonly _names: string[]
  protected readonly _locationStrategies: LocationStrategy[]
  protected readonly _namingStrategies: NamingStrategy[]

  public get Names(): string[] {
    return this._names
  }

  public constructor(params: { names: string[]; locationStrategies: LocationStrategy[]; namingStrategies: NamingStrategy[] }) {
    const { locationStrategies, namingStrategies, names } = params
    this._locationStrategies = locationStrategies
    this._namingStrategies = namingStrategies
    this._names = [...names]
  }

  protected _envNames(): string[] {
    const { result } = this._namingStrategies.reduce<{ result: string[]; lastResult: string[] }>(
      (acc, ns) => {
        acc.lastResult = ns.names([...acc.lastResult])
        acc.result.push(...acc.lastResult)
        return acc
      },
      { result: [...this.Names].reverse(), lastResult: [...this.Names].reverse() }
    )

    const resultNames = [...result].reverse()
    logger().debug(`Try names in this order: [${resultNames.join(', ')}]`)
    return resultNames
  }

  public envValue(): string | undefined {
    return this._envNames().reduce<string | undefined>((envResult, name) => {
      if (envResult) return envResult
      return this._locationStrategies.reduce<string | undefined>((locResult, ls) => {
        if (locResult) return locResult
        return ls.valueByName(name)
      }, undefined)
    }, undefined)
  }
}
