import { EnvLocationStrategy } from '../env-location/env-location-strategy'
import { BaseEnvStorage } from './base-env-storage'

export class EnvNumber extends BaseEnvStorage<number> {
  constructor(envStrategy: EnvLocationStrategy) {
    super(envStrategy)
  }

  protected _convertValue(envStrVal?: string): number | undefined {
    let convertedValue: number | undefined = undefined

    if (!isNaN(envStrVal as any)) {
      convertedValue = parseFloat(envStrVal!)
    }
    return convertedValue ?? this._defaultValue
  }

  public default(defaultValue: number): EnvNumber {
    this._default(defaultValue)
    return this
  }
}
