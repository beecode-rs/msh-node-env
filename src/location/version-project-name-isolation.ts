import { LocationStrategy } from './'
import { ProjectNameIsolation } from './project-name-isolation'

export type VersionProjectNameIsolationParams = {
  projectName: string
  version: string
}

export class VersionProjectNameIsolation extends ProjectNameIsolation implements LocationStrategy {
  protected readonly _version: string

  public constructor(params: VersionProjectNameIsolationParams) {
    super(params.projectName)
    this._version = params.version
  }

  private get __Version(): string {
    return this._version.split('.').join('_')
  }

  private __envProjectVersionName(envName: string): string {
    return [this._ProjectName, this.__Version, envName].join('_')
  }

  public getEnvStringValue(envName: string): string | undefined {
    return process.env[this.__envProjectVersionName(envName)] ?? super.getEnvStringValue(envName)
  }
}
