import { NamingStrategy } from '.'
import { logger } from '../util'

export type SuffixNameParams = {
  suffix: string
  joinChar?: string
}

export class SuffixName implements NamingStrategy {
  private readonly __suffix: string
  private readonly __joinChar: string

  public constructor(params: SuffixNameParams) {
    this.__suffix = params.suffix
    this.__joinChar = params.joinChar ?? '_'
  }

  public getNames(name: string | string[]): string[] {
    const names = typeof name === 'string' ? [name] : name

    const resultNames = [...names.map((n) => [n, this.__suffix].join(this.__joinChar))]
    logger().debug(`Original names: [${names.join(', ')}], suffixed names : [${resultNames.join(', ')}]`)
    return resultNames
  }
}
