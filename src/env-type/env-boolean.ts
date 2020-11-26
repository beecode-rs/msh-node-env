import { Env } from '../env'
import { BaseEnvStorage } from './base-env-storage'

export class EnvBoolean extends BaseEnvStorage<boolean> {
  constructor(env: Env) {
    super(env)
  }

  protected _convertValue(envStrVal?: string): boolean | undefined {
    let isConvertedValue: boolean | undefined = undefined

    if ((envStrVal ?? '').toLowerCase() === 'true') {
      isConvertedValue = true
    } else if ((envStrVal ?? '').toLowerCase() === 'false') {
      isConvertedValue = false
    } else {
      this._env.Logger.warn(`${envStrVal} is not a boolean`)
    }
    return isConvertedValue ?? this._defaultValue
  }

  public default(isDefaultValue: boolean): EnvBoolean {
    this._setDefault(isDefaultValue)
    return this
  }
}
