import { EnvLocationStrategy } from '../env-location/env-location-strategy'
import { BaseEnvStorage } from './base-env-storage'

export class EnvBoolean extends BaseEnvStorage<boolean> {
  constructor(envStrategy: EnvLocationStrategy) {
    super(envStrategy)
  }

  protected _convertValue(envStrVal?: string): boolean | undefined {
    let isConvertedValue: boolean | undefined = undefined

    if (envStrVal?.toLowerCase() === 'true') {
      isConvertedValue = true
    } else if (envStrVal?.toLowerCase() === 'false') {
      isConvertedValue = false
    }
    return isConvertedValue ?? this._defaultValue
  }

  public default(isDefaultValue: boolean): EnvBoolean {
    this._default(isDefaultValue)
    return this
  }
}
