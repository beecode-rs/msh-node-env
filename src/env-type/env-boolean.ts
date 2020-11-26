import { Env } from '../env'
import { BaseEnvStorage } from './base-env-storage'

export class EnvBoolean extends BaseEnvStorage<boolean> {
  constructor(env: Env) {
    super(env)
  }

  protected _convertValue(stringOrUndefined?: string): boolean | undefined {
    let isConvertedValue: boolean | undefined = undefined
    const stringValue = stringOrUndefined ?? ''
    if ((stringValue ?? '').toLowerCase() === 'true') {
      isConvertedValue = true
    } else if ((stringValue ?? '').toLowerCase() === 'false') {
      isConvertedValue = false
    } else {
      this._env.Logger.warn(`"${stringOrUndefined}" is not a boolean`)
    }
    return isConvertedValue ?? this._defaultValue
  }

  public default(isDefaultValue: boolean): EnvBoolean {
    this._setDefault(isDefaultValue)
    return this
  }
}
