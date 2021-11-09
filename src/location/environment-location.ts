import { LocationStrategy } from './location-strategy'

export class EnvironmentLocation implements LocationStrategy {
  public getValueByName(name: string): string | undefined {
    return process.env[name]
  }
}
