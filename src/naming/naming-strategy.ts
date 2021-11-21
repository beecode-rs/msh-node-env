export interface NamingStrategy {
  names(name: string | string[]): string[]
}
