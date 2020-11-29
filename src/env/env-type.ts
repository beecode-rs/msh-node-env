import { ConvertStrategy } from '../convert'
import { Env } from './'

export type BaseEnvStorageParams<T> = {
  convertStrategy: ConvertStrategy<T>
  env: Env
}

export class EnvType<T> {
  private __defaultValue: T | undefined = undefined
  private readonly __convertStrategy: ConvertStrategy<T>
  private readonly __env: Env

  public constructor(params: BaseEnvStorageParams<T>) {
    this.__convertStrategy = params.convertStrategy
    this.__env = params.env
  }

  public default(defaultValue: T): EnvType<T> {
    this.__defaultValue = defaultValue
    return this
  }

  // TODO implement allowed values validation
  // protected _allowedValues(...args: T[]): void {
  //   throw new Error('not implemented')
  // }

  public get required(): T {
    const envValue = this.optional
    if (typeof envValue === 'undefined') throw new Error(`${this.__env.Name} must have value defined`)
    return envValue
  }

  public get optional(): T | undefined {
    const str = (this.__env.getEnvStringValue() ?? '').trim()
    return this.__convertStrategy.convert(str) ?? this.__defaultValue
  }
}
