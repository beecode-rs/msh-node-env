import { LocationStrategy } from '.'

export class EnvironmentLocation implements LocationStrategy {
  public getValueByName(name: string): string | undefined {
    return process.env[name]
  }
}
