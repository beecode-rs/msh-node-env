import { LocationStrategy } from '../location-strategy'

export class MockLocationStrategy implements LocationStrategy {
  valueByName = jest.fn<string | undefined, [string]>()
}
