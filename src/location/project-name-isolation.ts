import { stringUtil } from '../util'
import { LocationStrategy, SimpleEnvLookup } from './'

export class ProjectNameIsolation extends SimpleEnvLookup implements LocationStrategy {
  protected readonly _projectName: string

  public constructor(projectName: string) {
    super()
    this._projectName = projectName
  }

  protected get _ProjectName(): string {
    return stringUtil.toSnakeUpperCase(this._projectName)
  }

  private __envName(envName: string): string {
    return [this._ProjectName, envName].join('_')
  }

  public getEnvStringValue(envName: string): string | undefined {
    return process.env[this.__envName(envName)] ?? super.getEnvStringValue(envName)
  }
}
