import { EnvLocationStrategy } from '../env-location/env-location-strategy'
import { LoggerStrategy } from '../logger/logger-strategy'
import { ConvertStrategy } from './convert-strategy'


export type BaseEnvStorageParams = {
  convertStrategy: ConvertStrategy<any>
  locationStrategy: EnvLocationStrategy
  loggerStrategy: LoggerStrategy
}

export abstract class BaseEnvStorage<T> {
  private __defaultValue: T | undefined = undefined
  private readonly __convertStrategy: ConvertStrategy<T>
  private readonly __locationStrategy: EnvLocationStrategy
  private readonly __loggerStrategy: LoggerStrategy


  protected constructor(params: BaseEnvStorageParams) {
    this.__convertStrategy = params.convertStrategy
    this.__locationStrategy = params.locationStrategy
    this.__loggerStrategy = params.loggerStrategy
  }

  public default(defaultValue: T): BaseEnvStorage<T> {
    this.__defaultValue = defaultValue
    return this
  }

  // TODO implement allowed values validation
  // protected _allowedValues(...args: T[]): void {
  //   throw new Error('not implemented')
  // }

  public get required(): T {
    const envValue = this.optional
    if (typeof envValue === 'undefined') {
      throw new Error(`${this._env.name} must have value defined`)
    }
    return envValue
  }

  public get optional(): T | undefined {
    return this.__convertStrategy.convert(this._env.getEnvStringValue())
  }
}
