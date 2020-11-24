import { EnvLocationStrategy } from './env-location/env-location-strategy'
import { EnvBase64 } from './env-type/env-base64'
import { EnvBoolean } from './env-type/env-boolean'
import { EnvJSON } from './env-type/env-json'
import { EnvNumber } from './env-type/env-number'
import { EnvString } from './env-type/env-string'

export class Env {
  private readonly __envStrategy: EnvLocationStrategy

  public constructor(envStrategy: EnvLocationStrategy) {
    this.__envStrategy = envStrategy
  }

  public get String(): EnvString {
    return new EnvString(this.__envStrategy)
  }
  public get Boolean(): EnvBoolean {
    return new EnvBoolean(this.__envStrategy)
  }
  public get Number(): EnvNumber {
    return new EnvNumber(this.__envStrategy)
  }
  public get Json(): EnvJSON {
    return new EnvJSON(this.__envStrategy)
  }
  public get Base64(): EnvBase64 {
    return new EnvBase64(this.__envStrategy)
  }
}
