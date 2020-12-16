export interface NamingStrategy {
  getNames(name: string | string[]): string[]
}
