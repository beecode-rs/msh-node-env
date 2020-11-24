export interface EnvLocationStrategy {
  getEnvStringValue(): string | undefined
  setEnvName(envName: string): void
  getEnvName(): string
}
