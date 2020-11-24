import { EnvLocationStrategy } from '../env-location/env-location-strategy'

export abstract class BaseEnvStorage<T> {
  protected _defaultValue: T | undefined = undefined
  protected _envStrategy: EnvLocationStrategy

  protected constructor(envStrategy: EnvLocationStrategy) {
    this._envStrategy = envStrategy
  }

  protected abstract _convertValue(envStrVal?: string): T | undefined

  protected _default(defaultValue: T): void {
    this._defaultValue = defaultValue
  }

  // TODO implement allowed values validation
  // protected _allowedValues(...args: T[]): void {
  //   throw new Error('not implemented')
  // }

  public requiredValue(): T {
    const envValue = this.value()
    if (typeof envValue === 'undefined') {
      throw new Error(`${this._envStrategy.getEnvName()} must have value defined`)
    }
    return envValue
  }

  public value(): T | undefined {
    return this._convertValue(this._envStrategy.getEnvStringValue())
  }
}
