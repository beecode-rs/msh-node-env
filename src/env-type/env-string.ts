import { EnvLocationStrategy } from '../env-location/env-location-strategy'
import { BaseEnvStorage } from './base-env-storage'

export class EnvString extends BaseEnvStorage<string> {
  constructor(envStrategy: EnvLocationStrategy) {
    super(envStrategy)
  }

  protected _convertValue(): string | undefined {
    return this._envStrategy.getEnvStringValue() ?? this._defaultValue
  }

  public default(defaultValue: string): EnvString {
    this._default(defaultValue)
    return this
  }
}
