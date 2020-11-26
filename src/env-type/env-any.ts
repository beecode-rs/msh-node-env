import { Env } from '../env'
import { BaseEnvStorage } from './base-env-storage'

export class EnvAny extends BaseEnvStorage<any> {
  constructor(env: Env) {
    super(env)
  }

  protected _convertValue(stringOrUndefined?: string): string | undefined {
    const stringValue = stringOrUndefined ?? ''
    return stringValue.trim() || this._defaultValue
  }

  public default(defaultValue: string): EnvAny {
    this._setDefault(defaultValue)
    return this
  }
}
