import { EnvLocationStrategy } from './env-location-strategy'
import { SimpleEnvLookup } from './simple-env-lookup'

export class ProjectNameIsolation extends SimpleEnvLookup implements EnvLocationStrategy {
  protected readonly _projectName: string

  public constructor(projectName: string) {
    super()
    this._projectName = projectName
  }

  public getEnvStringValue(): string | undefined {
    return (
      process.env[[this.__toSnakeCase(this._projectName).toUpperCase(), this.getEnvName()].join('_')] ?? super.getEnvStringValue()
    )
  }

  private __toSnakeCase(str: string): string {
    return (
      str &&
      (str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [])
        .map((x) => x.toLowerCase())
        .join('_')
    )
  }
}
