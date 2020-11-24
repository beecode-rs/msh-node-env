import { Env } from '../env'
import { BaseEnvStorage } from './base-env-storage'

export class EnvJSON extends BaseEnvStorage<any> {
  constructor(env: Env) {
    super(env)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected _convertValue(envStrVal?: any): any | undefined {
    let convertedValue: any | undefined = undefined

    try {
      convertedValue = JSON.parse(envStrVal)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err.message || err)
    }

    return convertedValue ?? this._defaultValue
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public default(defaultValue: any): EnvJSON {
    this._default(defaultValue)
    return this
  }
}
