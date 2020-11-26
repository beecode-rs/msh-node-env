import { Env } from '../env'
import { BaseEnvStorage } from './base-env-storage'

export class EnvJSON extends BaseEnvStorage<any> {
  constructor(env: Env) {
    super(env)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected _convertValue(envStrVal?: string): any | undefined {
    let convertedValue: any | undefined = undefined

    if (envStrVal) {
      try {
        convertedValue = JSON.parse(envStrVal)
      } catch (err) {
        this._env.Logger.warn(`Error parsing JSON: ${err.message || err}`)
      }
    }

    return convertedValue ?? this._defaultValue
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public default(defaultValue: any): EnvJSON {
    this._setDefault(defaultValue)
    return this
  }
}
