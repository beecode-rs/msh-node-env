import { ConvertStrategy } from '../convert/convert-strategy'
import { logger } from '../util/logger'
import { Env } from './env'
import DeepEqual from 'deep-equal'
import { inspect } from 'util'

export class EnvType<T> {
  protected _defaultValue: T | undefined = undefined
  protected readonly _convertStrategy: ConvertStrategy<T>
  protected readonly _env: Env
  protected _allowedValues: T[] = []

  public constructor(params: { convertStrategy: ConvertStrategy<T>; env: Env }) {
    const { convertStrategy, env } = params
    this._convertStrategy = convertStrategy
    this._env = env
  }

  public default(defaultValue: T): EnvType<T> {
    this._loggerDebug(`set default value`, { defaultValue })
    this._defaultValue = defaultValue
    return this
  }

  public get optional(): T | undefined {
    this._loggerDebug(`optional`)
    const strOrUndefined = this._env.envValue()

    this._loggerDebug(`try to convert env string value "${strOrUndefined}"`)
    const convertedValue = this._convertStrategy.convert(strOrUndefined)

    if (convertedValue === undefined) this._loggerDebug(`using default value "${this._defaultValue}"`)
    const optionalValue = convertedValue ?? this._defaultValue

    this._validateAllowedValues(optionalValue)
    return optionalValue
  }

  public get required(): T {
    this._loggerDebug(`is required`)

    const envValue = this.optional
    if (envValue === undefined) throw this._createError('must have value defined')

    return envValue
  }

  public allowed(...args: T[]): EnvType<T> {
    this._loggerDebug(`set allowed values`, { allowedValues: args })
    this._allowedValues = [...args]
    return this
  }

  protected _validateAllowedValues(value?: T): void {
    if (this._allowedValues.length === 0) return
    this._loggerDebug('validating allowed values for:', { value })

    if (this._allowedValuesDoNotContain(value))
      throw this._createError(`must have one of the fallowing values: ${this._allowedValuesToString()}`)
  }

  protected _allowedValuesDoNotContain(value?: T): boolean {
    const result = this._allowedValues.find((v) => DeepEqual(value, v))
    if (result === undefined && value === undefined) return false
    if (result === null && value === null) return false
    return !result
  }

  protected _allowedValuesToString(): string {
    return this._allowedValues.map((v) => inspect(v, false, 2)).join(', ')
  }

  protected _loggerDebug(msg: string, ...args: { [k: string]: any }[]): void {
    logger().debug(`${this._EnvName} ${msg}`, ...args)
  }

  protected _createError(msg: string): Error {
    return new Error(`${this._EnvName} ${msg}`)
  }

  protected get _EnvName(): string {
    return `Env[${this._env.Name}]`
  }
}
