export interface LocationStrategy {
  getEnvStringValue(eventName: string): string | undefined
}
