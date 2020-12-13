import { ConvertStrategy } from '.'
import { decode } from 'base-64'

export class Base64ToString implements ConvertStrategy<string> {
  public convert(str: string): string | undefined {
    if (str.trim() === '') return undefined
    try {
      return decode(str)
    } catch (e) {
      throw new Error(`"${str}" is not a base64. Error: ${e.message}`)
    }
  }
}
