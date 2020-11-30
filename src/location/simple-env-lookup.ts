import { LocationStrategy } from '.'

export class SimpleEnvLookup implements LocationStrategy {
  public getEnvStringValue(envName: string): string | undefined {
    return process.env[envName]
  }
}
