import { Env } from '../env'

export abstract class BaseEnvStorage<T> {
  protected _defaultValue: T | undefined = undefined
  protected _env: Env

  protected constructor(env: Env) {
    this._env = env
  }

  protected abstract _convertValue(envStrVal?: string): T | undefined

  protected _default(defaultValue: T): void {
    this._defaultValue = defaultValue
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
    return this._convertValue(this._env.getEnvStringValue())
  }
}
