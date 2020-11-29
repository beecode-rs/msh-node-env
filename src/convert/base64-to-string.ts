import { ConvertStrategy } from './'
import { decode } from 'base-64'

export class Base64ToString implements ConvertStrategy<string> {
  public convert(str: string): string | undefined {
    if (str.trim() === '') return undefined
    return decode(str)
  }
}
