import { LocationStrategy } from '../../location/location-strategy'
import { NamingStrategy } from '../../naming/naming-strategy'

export class Env {
  protected readonly _names: string[]
  protected readonly _locationStrategies: LocationStrategy[]
  protected readonly _namingStrategies: NamingStrategy[]

  public constructor(params: { names: string[]; locationStrategies: LocationStrategy[]; namingStrategies: NamingStrategy[] }) {
    const { locationStrategies, namingStrategies, names } = params
    this._locationStrategies = locationStrategies
    this._namingStrategies = namingStrategies
    this._names = names
  }

  public mockName = jest.fn<string[], []>()

  public get Names(): string[] {
    return this.mockName()
  }
  protected _envNames = jest.fn<string[], []>()

  public envValue = jest.fn<string | undefined, []>()
}
