import { ConvertStrategy } from '../convert/convert-strategy'
import { logger } from '../util/logger-util'
import { IEnv } from './env'
import deepEqual from 'deep-equal'
import { inspect } from 'util'

export type EnvTypeParams<T> = {
  convertStrategy: ConvertStrategy<T>
  env: IEnv
}

export class EnvType<T> {
  private __defaultValue: T | undefined = undefined
  private readonly __convertStrategy: ConvertStrategy<T>
  private readonly __env: IEnv
  private __allowedValues: T[] = []

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
    const str = (this.__env.envStringValue() ?? '').trim()
    if (str !== '') logger().debug('Try to convert env string value')
    const convertedValue = str === '' ? undefined : this.__convertStrategy.convert(str)
    const optionalValue = convertedValue ?? this.__defaultValue
    this.__validateAllowedValues(optionalValue)
    return optionalValue
  }

  public get required(): T {
    const envValue = this.optional
    if (this.__isUndefined(envValue)) throw new Error(`${this.__env.Name} must have value defined`)
    return envValue!
  }

  public allowed(...args: T[]): EnvType<T> {
    this.__allowedValues = args
    return this
  }

  private __validateAllowedValues(value?: T): void {
    if (this.__allowedValues.length === 0) return
    if (this.__isUndefined(value) || !this.__allowedValues.find((v) => deepEqual(value, v)))
      throw new Error(
        `${this.__env.Name} must have one of the fallowing values [${this.__allowedValues
          .map((v) => inspect(v, false, 2))
          .join(', ')}]`
      )
  }

  private __isUndefined(value?: T): boolean {
    return typeof value === 'undefined'
  }
}
