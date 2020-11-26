import { EnvLocationStrategy } from './env-location-strategy'

export class SimpleEnvLookup implements EnvLocationStrategy {
  public getEnvStringValue(envName: string): string | undefined {
    return process.env[envName]
  }
}
