import { ConvertStrategy } from './convert-strategy'

export class ToNumber implements ConvertStrategy<number> {
  public convert(str?: string): number | undefined {
    if (str === undefined) return undefined
    if (str.trim() === '') return undefined
    const convertedValue = Number(str)
    if (isNaN(convertedValue)) throw new Error(`"${str}" is not a number`)
    return convertedValue
  }
}
