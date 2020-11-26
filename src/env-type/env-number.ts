import { Env } from '../env'
import { BaseEnvStorage } from './base-env-storage'

export class EnvNumber extends BaseEnvStorage<number> {
  constructor(env: Env) {
    super(env)
  }

  protected _convertValue(envStrVal?: string): number | undefined {
    let convertedValue: number | undefined = undefined

    if (!isNaN(envStrVal as any)) {
      convertedValue = parseFloat(envStrVal!)
    } else {
      this._env.Logger.warn(`${envStrVal} is not a number`)
    }
    return convertedValue ?? this._defaultValue
  }

  public default(defaultValue: number): EnvNumber {
    this._setDefault(defaultValue)
    return this
  }
}
