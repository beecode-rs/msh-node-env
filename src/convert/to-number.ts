import { ConvertStrategy } from './'

export class ToNumber implements ConvertStrategy<number> {
  public convert(str: string): number | undefined {
    if (str.trim() === '') return undefined
    const convertedValue = Number(str)
    if (isNaN(convertedValue)) throw new Error(`"${str}" is not a number`)
    return convertedValue
  }
}
