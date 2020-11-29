import { stringUtil } from '../util'
import { LocationStrategy, SimpleEnvLookup } from './'

export class ProjectNameIsolation extends SimpleEnvLookup implements LocationStrategy {
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
