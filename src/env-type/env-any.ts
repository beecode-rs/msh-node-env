import { Env } from '../env'
import { BaseEnvStorage } from './base-env-storage'

export class EnvAny extends BaseEnvStorage<any> {
  constructor(env: Env) {
    super(env)
  }

  protected _convertValue(): string | undefined {
    return this._env.getEnvStringValue() ?? this._defaultValue
  }

  public default(defaultValue: string): EnvAny {
    this._setDefault(defaultValue)
    return this
  }
}
