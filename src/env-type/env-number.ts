import { Env } from '../env'
import { BaseEnvStorage } from './base-env-storage'

export class EnvNumber extends BaseEnvStorage<number> {
  constructor(env: Env) {
    super(env)
  }

  protected _convertValue(stringOrUndefined?: string): number | undefined {
    let convertedValue: number | undefined = undefined
    const stringValue = stringOrUndefined ?? ''
    if (stringValue.trim() !== '' && !isNaN(stringValue as any)) {
      convertedValue = parseFloat(stringValue!)
    } else {
      this._env.Logger.warn(`"${stringOrUndefined}" is not a number`)
    }
    return convertedValue ?? this._defaultValue
  }

  public default(defaultValue: number): EnvNumber {
    this._setDefault(defaultValue)
    return this
  }
}
