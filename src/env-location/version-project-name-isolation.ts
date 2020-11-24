import { EnvLocationStrategy } from './env-location-strategy'
import { ProjectNameIsolation } from './project-name-isolation'

export class VersionProjectNameIsolation extends ProjectNameIsolation implements EnvLocationStrategy {
  protected readonly _version: string

  public constructor(projectName: string, version: string) {
    super(projectName)
    this._version = version
  }

  public getEnvStringValue(): string | undefined {
    return process.env[[this._projectName.toUpperCase(), this._version, this.getEnvName()].join('_')] ?? super.getEnvStringValue()
  }
}
