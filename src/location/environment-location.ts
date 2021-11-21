import { LocationStrategy } from './location-strategy'

export class EnvironmentLocation implements LocationStrategy {
  public valueByName(name: string): string | undefined {
    return process.env[name]
  }
}
