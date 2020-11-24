import { EnvLocationStrategy } from './env-location/env-location-strategy'
import { EnvBase64 } from './env-type/env-base64'
import { EnvBoolean } from './env-type/env-boolean'
import { EnvJSON } from './env-type/env-json'
import { EnvNumber } from './env-type/env-number'
import { EnvString } from './env-type/env-string'
import { MshNodeEnvParams } from './index'

export type EnvParams = MshNodeEnvParams & {
  name: string
  locationStrategy: EnvLocationStrategy
}

export class Env {
  private readonly __locationStrategy: EnvLocationStrategy
  private readonly __name: string

  public get name(): string {
    return this.__name
  }
  public constructor(params: EnvParams) {
    this.__locationStrategy = params.locationStrategy
    this.__name = params.name
  }

  public getEnvStringValue(): string | undefined {
    return this.__locationStrategy.getEnvStringValue(this.__name)
  }

  public get string(): EnvString {
    return new EnvString(this)
  }
  public get boolean(): EnvBoolean {
    return new EnvBoolean(this)
  }
  public get number(): EnvNumber {
    return new EnvNumber(this)
  }
  public get json(): EnvJSON {
    return new EnvJSON(this)
  }
  public get base64(): EnvBase64 {
    return new EnvBase64(this)
  }
}
