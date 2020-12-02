import { ConvertStrategy } from '.'

export class ToJson<T> implements ConvertStrategy<T> {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public convert(str: string): T | undefined {
    if (str.trim() === '') return undefined
    return JSON.parse(str)
  }
}
