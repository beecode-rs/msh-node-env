import { logger } from '../util/logger'
import { NamingStrategy } from './naming-strategy'

export class PrefixName implements NamingStrategy {
  protected readonly _prefix: string

  public constructor(prefix: string) {
    this._prefix = prefix
  }

  public names(nameOrNames: string | string[]): string[] {
    const names = typeof nameOrNames === 'string' ? [nameOrNames] : nameOrNames

    const resultNames = [...names.map((n) => [this._prefix, n].join(''))]
    logger().debug(`Original names: [${names.join(', ')}], prefixed names : [${resultNames.join(', ')}]`)
    return resultNames
  }
}
