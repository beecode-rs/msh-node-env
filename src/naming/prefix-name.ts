import { NamingStrategy } from '.'

export type PrefixNameParams = {
  prefix: string
  joinChar?: string
}
export class PrefixName implements NamingStrategy {
  private readonly __prefix: string
  private readonly __joinChar: string

  public constructor(params: PrefixNameParams) {
    this.__prefix = params.prefix
    this.__joinChar = params.joinChar ?? '_'
  }

  public getNames(name: string | string[]): string[] {
    const names = typeof name === 'string' ? [name] : name

    return [...names.map((n) => [this.__prefix, n].join(this.__joinChar)), ...names]
  }
}
