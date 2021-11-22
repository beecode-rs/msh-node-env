import { NamingStrategy } from '../naming-strategy'

export class MockNamingStrategy implements NamingStrategy {
  names = jest.fn<string[], [string[]]>()
}
