import { Env } from '../env'
import { BaseEnvStorage } from './base-env-storage'

export class EnvString extends BaseEnvStorage<string> {
  constructor(env: Env) {
    super(env)
  }

  protected _convertValue(): string | undefined {
    return this._env.getEnvStringValue() ?? this._defaultValue
  }

  public default(defaultValue: string): EnvString {
    this._setDefault(defaultValue)
    return this
  }
}
