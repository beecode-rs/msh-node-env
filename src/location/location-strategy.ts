export interface LocationStrategy {
  getValueByName(name: string): string | undefined
}
