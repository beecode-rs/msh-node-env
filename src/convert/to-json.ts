import { ConvertStrategy } from './convert-strategy'

export class ToJson<T> implements ConvertStrategy<T> {
  public convert(str: string): T | undefined {
    if (str.trim() === '') return undefined
    try {
      return JSON.parse(str)
    } catch (e) {
      if (e instanceof Error) throw new Error(`"${str}" is not a json. Error: ${e.message}`)
      throw e
    }
  }
}
