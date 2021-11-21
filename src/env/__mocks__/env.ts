import { LocationStrategy } from '../../location/location-strategy'
import { NamingStrategy } from '../../naming/naming-strategy'

export class Env {
  protected readonly _name: string
  protected readonly _locationStrategies: LocationStrategy[]
  protected readonly _namingStrategies: NamingStrategy[]

  public constructor(params: { name: string; locationStrategies: LocationStrategy[]; namingStrategies: NamingStrategy[] }) {
    const { locationStrategies, namingStrategies, name } = params
    this._locationStrategies = locationStrategies
    this._namingStrategies = namingStrategies
    this._name = name
  }

  public mockName = jest.fn<string, []>()

  public get Name(): string {
    return this.mockName()
  }
  protected _envNames = jest.fn<string[], []>()

  public envValue = jest.fn<string | undefined, []>()
}
