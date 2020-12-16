import { NamingStrategy } from '.'

export class SimpleName implements NamingStrategy {
  public getNames(name: string | string[]): string[] {
    return typeof name === 'string' ? [name] : name
  }
}
