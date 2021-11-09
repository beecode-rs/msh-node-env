import { ConvertStrategy } from './convert-strategy'

export class ToBoolean implements ConvertStrategy<boolean> {
  public convert(str: string): boolean | undefined {
    const strLower = str.toLowerCase()
    if (strLower === 'true') {
      return true
    } else if (strLower === 'false') {
      return false
    }
    return undefined
  }
}
