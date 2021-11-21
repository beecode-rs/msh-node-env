import { NamingStrategy } from './naming-strategy'

export class SimpleName implements NamingStrategy {
  public names(nameOrNames: string | string[]): string[] {
    return typeof nameOrNames === 'string' ? [nameOrNames] : nameOrNames
  }
}
