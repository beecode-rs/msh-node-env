import { ConvertStrategy } from './convert-strategy'

export class ToString implements ConvertStrategy<string> {
  public convert(str: string): string | undefined {
    if (str.trim() === '') return undefined
    return str
  }
}
