import { EnvLocationStrategy } from './env-location-strategy'

export class SimpleEnvLookup implements EnvLocationStrategy {
  private __envName: string | undefined

  public setEnvName(envName: string): void {
    this.__envName = envName
  }
  public getEnvName(): string{
    if (typeof this.__envName === 'undefined') throw new Error('ENV value not set')
    return this.__envName
  }

  public getEnvStringValue(): string | undefined {
    return process.env[this.getEnvName()]
  }
}
