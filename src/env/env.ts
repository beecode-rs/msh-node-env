import { LocationStrategy } from '../location/location-strategy'
import { NamingStrategy } from '../naming/naming-strategy'
import { logger } from '../util/logger'

export class Env {
  protected readonly _name: string
  protected readonly _locationStrategies: LocationStrategy[]
  protected readonly _namingStrategies: NamingStrategy[]

  public get Name(): string {
    return this._name
  }

  public constructor(params: { name: string; locationStrategies: LocationStrategy[]; namingStrategies: NamingStrategy[] }) {
    const { locationStrategies, namingStrategies, name } = params
    this._locationStrategies = locationStrategies
    this._namingStrategies = namingStrategies
    this._name = name
  }

  protected _envNames(): string[] {
    const { result } = this._namingStrategies.reduce<{ result: string[]; lastResult: string[] }>(
      (acc, ns) => {
        acc.lastResult = ns.names(acc.lastResult)
        acc.result.push(...acc.lastResult)
        return acc
      },
      { result: [this.Name], lastResult: [this.Name] }
    )

    const resultNames = result.reverse()
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
