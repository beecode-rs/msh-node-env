import { IEnv } from '.'
import { ConvertStrategy } from '../convert'
import { logger } from '../util'

export type EnvTypeParams<T> = {
  convertStrategy: ConvertStrategy<T>
  env: IEnv
}

export class EnvType<T> {
  private __defaultValue: T | undefined = undefined
  private readonly __convertStrategy: ConvertStrategy<T>
  private readonly __env: IEnv

  public constructor(params: EnvTypeParams<T>) {
    this.__convertStrategy = params.convertStrategy
    this.__env = params.env
  }

  public default(defaultValue: T): EnvType<T> {
    logger().debug('Using default value')
    this.__defaultValue = defaultValue
    return this
  }

  public get optional(): T | undefined {
    const str = (this.__env.getEnvStringValue() ?? '').trim()
    if (str !== '') logger().debug('Try to convert env string value')
    const convertedValue = str === '' ? undefined : this.__convertStrategy.convert(str)
    return convertedValue ?? this.__defaultValue
  }

  public get required(): T {
    const envValue = this.optional
    if (typeof envValue === 'undefined') throw new Error(`${this.__env.Name} must have value defined`)
    return envValue
  }

  // TODO implement allowed values validation
  // protected _allowedValues(...args: T[]): void {
  //   throw new Error('not implemented')
  // }
}
