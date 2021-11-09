import { logger } from '../util/logger-util'
import { NamingStrategy } from './naming-strategy'

export type PrefixNameParams = {
  prefix: string
  joinChar?: string
}
export class PrefixName implements NamingStrategy {
  private readonly __prefix: string
  private readonly __joinChar: string

  public constructor({ prefix, joinChar }: PrefixNameParams) {
    this.__prefix = prefix
    this.__joinChar = joinChar ?? '_'
  }

  public getNames(name: string | string[]): string[] {
    const names = typeof name === 'string' ? [name] : name

    const resultNames = [...names.map((n) => [this.__prefix, n].join(this.__joinChar))]
    logger().debug(`Original names: [${names.join(', ')}], prefixed names : [${resultNames.join(', ')}]`)
    return resultNames
  }
}
