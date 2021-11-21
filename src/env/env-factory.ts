import { Base64ToString } from '../convert/base64-to-string'
import { ToBoolean } from '../convert/to-boolean'
import { ToJson } from '../convert/to-json'
import { ToNumber } from '../convert/to-number'
import { ToString } from '../convert/to-string'
import { LocationStrategy } from '../location/location-strategy'
import { NamingStrategy } from '../naming/naming-strategy'
import { Env } from './env'
import { EnvType } from './env-type'

export class EnvFactory {
  protected readonly _env: Env

  constructor(params: { name: string; locationStrategies: LocationStrategy[]; namingStrategies: NamingStrategy[] }) {
    const { name, locationStrategies, namingStrategies } = params
    this._env = new Env({ name, locationStrategies, namingStrategies })
  }

  public get string(): EnvType<string> {
    return new EnvType<string>({ convertStrategy: new ToString(), env: this._env })
  }

  public get boolean(): EnvType<boolean> {
    return new EnvType<boolean>({ convertStrategy: new ToBoolean(), env: this._env })
  }

  public get number(): EnvType<number> {
    return new EnvType<number>({ convertStrategy: new ToNumber(), env: this._env })
  }

  public json<T>(): EnvType<T> {
    return new EnvType<T>({ convertStrategy: new ToJson<T>(), env: this._env })
  }

  public get base64(): EnvType<string> {
    return new EnvType<string>({ convertStrategy: new Base64ToString(), env: this._env })
  }
}
