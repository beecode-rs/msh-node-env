import { Env } from '../env/env'
import { EnvType } from '../env/env-type'
import { Base64ToString } from './base64-to-string'
import { ToBoolean } from './to-boolean'
import { ToJson } from './to-json'
import { ToNumber } from './to-number'
import { ToString } from './to-string'

export class BaseConvert {
  private readonly __env: Env

  public constructor(env: Env) {
    this.__env = env
  }

  public get string(): EnvType<string> {
    return new EnvType<string>({ convertStrategy: new ToString(), env: this.__env })
  }

  public get boolean(): EnvType<boolean> {
    return new EnvType<boolean>({ convertStrategy: new ToBoolean(), env: this.__env })
  }

  public get number(): EnvType<number> {
    return new EnvType<number>({ convertStrategy: new ToNumber(), env: this.__env })
  }

  public json<T>(): EnvType<T> {
    return new EnvType<T>({ convertStrategy: new ToJson<T>(), env: this.__env })
  }

  public get base64(): EnvType<string> {
    return new EnvType<string>({ convertStrategy: new Base64ToString(), env: this.__env })
  }
}
