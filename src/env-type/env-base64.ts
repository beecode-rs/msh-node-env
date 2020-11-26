import { Env } from '../env'
import { BaseEnvStorage } from './base-env-storage'
import { decode } from 'base-64'

export class EnvBase64 extends BaseEnvStorage<string> {
  constructor(env: Env) {
    super(env)
  }

  protected _convertValue(envStrVal?: string): string | undefined {
    let convertedValue: string | undefined = undefined

    if (envStrVal) {
      try {
        convertedValue = decode(envStrVal)
      } catch (err) {
        this._env.Logger.warn(`Unable to decode ${envStrVal}. Error: ${err.message || err}`)
      }
    }

    return convertedValue ?? this._defaultValue
  }

  public default(defaultValue: string): EnvBase64 {
    this._setDefault(defaultValue)
    return this
  }
}
