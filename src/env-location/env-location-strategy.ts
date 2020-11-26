export interface EnvLocationStrategy {
  getEnvStringValue(eventName: string): string | undefined
}
