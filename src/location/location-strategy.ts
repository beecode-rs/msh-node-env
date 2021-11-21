export interface LocationStrategy {
  valueByName(name: string): string | undefined
}
