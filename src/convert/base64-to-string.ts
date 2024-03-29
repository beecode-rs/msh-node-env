import { ConvertStrategy } from './convert-strategy'
import { decode } from 'base-64'

export class Base64ToString implements ConvertStrategy<string> {
  public convert(str?: string): string | undefined {
    if (str === undefined) return undefined
    if (str.trim() === '') return undefined
    try {
      return decode(str)
    } catch (err: any) {
      throw new Error(`"${str}" is not a base64. Error: ${err.message}`)
    }
  }
}
