import { EnvLocationStrategy } from './env-location/env-location-strategy'
import { EnvAny } from './env-type/env-any'
import { EnvBase64 } from './env-type/env-base64'
import { EnvBoolean } from './env-type/env-boolean'
import { EnvJSON } from './env-type/env-json'
import { EnvNumber } from './env-type/env-number'
import { EnvString } from './env-type/env-string'
import { LoggerStrategy } from './logger/logger-strategy'

export type EnvParams = {
  name: string
  locationStrategy: EnvLocationStrategy
  loggerStrategy: LoggerStrategy
}

export class Env {
  private readonly __locationStrategy: EnvLocationStrategy
  private readonly __name: string
  private readonly __loggerStrategy: LoggerStrategy

  public get Logger(): LoggerStrategy {
    return this.__loggerStrategy
  }

  public get name(): string {
    return this.__name
  }
  public constructor(params: EnvParams) {
    this.__locationStrategy = params.locationStrategy
    this.__loggerStrategy = params.loggerStrategy
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
  public get any(): EnvAny {
    return new EnvAny(this)
  }
  public get base64(): EnvBase64 {
    return new EnvBase64(this)
  }
}
