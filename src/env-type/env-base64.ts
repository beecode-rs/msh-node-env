import { EnvLocationStrategy } from '../env-location/env-location-strategy'
import { BaseEnvStorage } from './base-env-storage'
import { decode } from 'base-64'

export class EnvBase64 extends BaseEnvStorage<string> {
  constructor(envStrategy: EnvLocationStrategy) {
    super(envStrategy)
  }

  protected _convertValue(envStrVal?: string): string | undefined {
    let convertedValue: string | undefined = undefined

    try {
      if (envStrVal) {
        convertedValue = decode(envStrVal)
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message || err)
    }

    return convertedValue ?? this._defaultValue
  }

  public default(defaultValue: string): EnvBase64 {
    this._default(defaultValue)
    return this
  }
}
