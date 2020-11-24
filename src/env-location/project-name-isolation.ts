import { stringUtil } from '../util/string-util'
import { EnvLocationStrategy } from './env-location-strategy'
import { SimpleEnvLookup } from './simple-env-lookup'

export class ProjectNameIsolation extends SimpleEnvLookup implements EnvLocationStrategy {
  protected readonly _projectName: string

  public constructor(projectName: string) {
    super()
    this._projectName = projectName
  }

  public getEnvStringValue(envName: string): string | undefined {
    return (
      process.env[[stringUtil.toSnakeCase(this._projectName).toUpperCase(), envName].join('_')] ??
      super.getEnvStringValue(envName)
    )
  }
}
